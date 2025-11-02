import * as React from 'react';
import { Animated, Easing } from 'react-native';
import { Text } from 'react-native-paper';

type Props = { title: string; subtitle?: string };

export default function WelcomeBanner({ title, subtitle }: Props) {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(10)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }} className="px-4 pb-2 pt-6">
      <Text variant="headlineMedium" className="text-text_heading_color">
        {title}
      </Text>
      {!!subtitle && <Text className="text-onSurfaceVariant mt-1">{subtitle}</Text>}
    </Animated.View>
  );
}
