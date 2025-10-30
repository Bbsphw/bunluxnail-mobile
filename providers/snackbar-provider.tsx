// providers/snackbar-provider.tsx

import * as React from 'react';
import { Snackbar, Portal } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Variant = 'info' | 'success' | 'error';
type SnackbarContextValue = {
  show: (text: string, opts?: { variant?: Variant; duration?: number }) => void;
};

const SnackbarContext = React.createContext<SnackbarContextValue | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState('');
  const [variant, setVariant] = React.useState<Variant>('info');
  const [duration, setDuration] = React.useState<number>(3000);
  const insets = useSafeAreaInsets();
  const timer = React.useRef<NodeJS.Timeout | null>(null);

  const show = React.useCallback((t: string, opts?: { variant?: Variant; duration?: number }) => {
    setVisible(false);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setText(t);
      setVariant(opts?.variant ?? 'info');
      setDuration(opts?.duration ?? 3000);
      setVisible(true);
    }, 50);
  }, []);

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const background =
    variant === 'error' ? '#dc2626' : variant === 'success' ? '#16a34a' : '#4B352A';

  return (
    <SnackbarContext.Provider value={{ show }}>
      {children}
      <Portal>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={duration}
          style={{
            position: 'absolute',
            left: 16,
            right: 16,
            bottom: (insets.bottom || 12) + 12,
            backgroundColor: background,
          }}>
          {text}
        </Snackbar>
      </Portal>
    </SnackbarContext.Provider>
  );
};

export function useSnackbar(): SnackbarContextValue {
  const ctx = React.useContext(SnackbarContext);
  if (!ctx) throw new Error('useSnackbar must be used inside SnackbarProvider');
  return ctx;
}
