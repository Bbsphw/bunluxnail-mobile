// // providers/snackbar-provider.tsx

// import * as React from 'react';
// import { Snackbar, Portal } from 'react-native-paper';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// type Variant = 'info' | 'success' | 'error';
// type SnackbarContextValue = {
//   show: (text: string, opts?: { variant?: Variant; duration?: number }) => void;
// };

// const SnackbarContext = React.createContext<SnackbarContextValue | undefined>(undefined);

// export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [visible, setVisible] = React.useState(false);
//   const [text, setText] = React.useState('');
//   const [variant, setVariant] = React.useState<Variant>('info');
//   const [duration, setDuration] = React.useState<number>(3000);
//   const insets = useSafeAreaInsets();
//   const timer = React.useRef<NodeJS.Timeout | null>(null);

//   const show = React.useCallback((t: string, opts?: { variant?: Variant; duration?: number }) => {
//     setVisible(false);
//     if (timer.current) clearTimeout(timer.current);
//     timer.current = setTimeout(() => {
//       setText(t);
//       setVariant(opts?.variant ?? 'info');
//       setDuration(opts?.duration ?? 3000);
//       setVisible(true);
//     }, 50);
//   }, []);

//   React.useEffect(
//     () => () => {
//       if (timer.current) clearTimeout(timer.current);
//     },
//     []
//   );

//   const background =
//     variant === 'error' ? '#dc2626' : variant === 'success' ? '#16a34a' : '#4B352A';

//   return (
//     <SnackbarContext.Provider value={{ show }}>
//       {children}
//       <Portal>
//         <Snackbar
//           visible={visible}
//           onDismiss={() => setVisible(false)}
//           duration={duration}
//           wrapperStyle={{
//             position: 'absolute',
//             left: 16,
//             right: 16,
//             top: (insets.top || 24) + 12, // ✅ ใช้ safe-area ด้านบน
//           }}
//           style={{
//             backgroundColor: background,
//             borderRadius: 12,
//             elevation: 4,
//           }}>
//           {text}
//         </Snackbar>
//       </Portal>
//     </SnackbarContext.Provider>
//   );
// };

// export function useSnackbar(): SnackbarContextValue {
//   const ctx = React.useContext(SnackbarContext);
//   if (!ctx) throw new Error('useSnackbar must be used inside SnackbarProvider');
//   return ctx;
// }

// providers/snackbar-provider.tsx
import * as React from 'react';
import { Animated, Easing, View, StyleSheet } from 'react-native';
import { Portal, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Variant = 'info' | 'success' | 'error' | 'warning';
type SnackbarContextValue = {
  show: (text: string, opts?: { variant?: Variant; duration?: number }) => void;
};

const SnackbarContext = React.createContext<SnackbarContextValue | undefined>(undefined);

const COLORS: Record<
  Variant,
  { bg: string; fg: string; icon: keyof typeof MaterialCommunityIcons.glyphMap }
> = {
  info: { bg: '#1f2937', fg: '#F2F4F7', icon: 'information-outline' },
  success: { bg: '#14532d', fg: '#ECFDF3', icon: 'check-circle-outline' },
  error: { bg: '#7f1d1d', fg: '#FEE2E2', icon: 'alert-octagon-outline' },
  warning: { bg: '#6b4f00', fg: '#FFF7E6', icon: 'alert-outline' },
};

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const insets = useSafeAreaInsets();

  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState('');
  const [variant, setVariant] = React.useState<Variant>('info');
  const [duration, setDuration] = React.useState(3000);

  // animation states
  const slideY = React.useRef(new Animated.Value(-60)).current; // start above top
  const opacity = React.useRef(new Animated.Value(0)).current;
  const timer = React.useRef<NodeJS.Timeout | null>(null);

  const show = React.useCallback(
    (t: string, opts?: { variant?: Variant; duration?: number }) => {
      // clear pending
      if (timer.current) clearTimeout(timer.current);
      setVisible(false);

      // set state
      setText(t);
      setVariant(opts?.variant ?? 'info');
      const ms = Math.max(1500, Math.min(opts?.duration ?? 3000, 8000));
      setDuration(ms);

      // small delay to reset anim baseline then play
      setTimeout(() => {
        setVisible(true);
        // enter
        Animated.parallel([
          Animated.timing(slideY, {
            toValue: 0,
            duration: 220,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 220,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]).start();

        // auto dismiss
        timer.current = setTimeout(() => {
          // exit
          Animated.parallel([
            Animated.timing(slideY, {
              toValue: -60,
              duration: 180,
              easing: Easing.in(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 180,
              easing: Easing.in(Easing.cubic),
              useNativeDriver: true,
            }),
          ]).start(({ finished }) => {
            if (finished) setVisible(false);
          });
        }, ms);
      }, 30);
    },
    [opacity, slideY]
  );

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const palette = COLORS[variant];

  return (
    <SnackbarContext.Provider value={{ show }}>
      {children}
      <Portal>
        {visible ? (
          <Animated.View
            pointerEvents="box-none"
            style={[
              styles.wrapper,
              {
                paddingTop: (insets.top || 20) + 8,
                transform: [{ translateY: slideY }],
                opacity,
              },
            ]}>
            <View style={[styles.container, { backgroundColor: palette.bg }]}>
              <MaterialCommunityIcons
                name={palette.icon}
                size={18}
                color={palette.fg}
                style={{ marginRight: 8, marginTop: 1 }}
              />
              <Text style={[styles.text, { color: palette.fg }]} numberOfLines={3}>
                {text}
              </Text>
            </View>
          </Animated.View>
        ) : null}
      </Portal>
    </SnackbarContext.Provider>
  );
};

export function useSnackbar(): SnackbarContextValue {
  const ctx = React.useContext(SnackbarContext);
  if (!ctx) throw new Error('useSnackbar must be used inside SnackbarProvider');
  return ctx;
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    // center horizontally on large screens but keep margin on small ones
    alignItems: 'center',
  },
  container: {
    maxWidth: 720,
    width: '92%',
    minHeight: 46,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // subtle shadow
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  text: {
    fontSize: 14.5,
    lineHeight: 20,
    flexShrink: 1,
  },
});
