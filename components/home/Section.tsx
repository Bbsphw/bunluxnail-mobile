// components/home/Section.tsx
import * as React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

type Props = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Section({ title, subtitle, children, className }: Props) {
  return (
    <View className={className ?? ''}>
      {title ? (
        <Text variant="titleLarge" className="text-text_heading_color">
          {title}
        </Text>
      ) : null}
      {subtitle ? <Text className="text-onSurfaceVariant mt-1">{subtitle}</Text> : null}
      {children}
    </View>
  );
}
