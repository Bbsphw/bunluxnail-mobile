// components/home/ServicesGrid.tsx

import * as React from 'react';
import { Image, Pressable, View } from 'react-native';
import { Text, Card } from 'react-native-paper';
import type { ServiceItem } from '@/types/service';

type Props = {
  services: ServiceItem[];
  onPressItem?: (s: ServiceItem) => void;
};

export default function ServicesGrid({ services, onPressItem }: Props) {
  return (
    <View className="flex-row flex-wrap justify-between">
      {services.map((s) => (
        <Pressable
          key={s.id}
          className="mb-3 w-[48%]"
          onPress={() => onPressItem?.(s)}
          android_ripple={{ color: '#00000014' }}>
          <Card className="overflow-hidden rounded-xl">
            {s.picture ? (
              <Image source={{ uri: s.picture }} className="h-32 w-full" resizeMode="cover" />
            ) : (
              <View className="h-32 w-full items-center justify-center bg-white/40">
                <Text className="text-onSurfaceVariant">No image</Text>
              </View>
            )}
            <View className="p-3">
              <Text className="text-text_heading_color line-clamp-1 font-medium">{s.title}</Text>
              <Text className="text-onSurfaceVariant mt-0.5 line-clamp-2 text-xs">
                {s.subtitle}
              </Text>
              <Text className="text-primary_color mt-2 font-semibold">฿{s.price}</Text>
            </View>
          </Card>
        </Pressable>
      ))}
    </View>
  );
}
