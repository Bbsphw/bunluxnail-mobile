// // components/home/ServicesRow.tsx
// import * as React from 'react';
// import { ScrollView, View } from 'react-native';
// import { Text } from 'react-native-paper';
// import ServiceCard from './ServiceCard';

// type Service = { id: number; title: string; price: string; time: string; image: string };

// type Props = {
//   title: string;
//   services: Service[];
// };

// export default function ServicesRow({ title, services }: Props) {
//   return (
//     <View className="mt-6">
//       <View className="mb-3 px-4">
//         <Text variant="titleLarge" className="text-text_heading_color">
//           {title}
//         </Text>
//       </View>
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{ paddingHorizontal: 16 }}>
//         {services.map((s) => (
//           <ServiceCard key={s.id} {...s} />
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

import * as React from 'react';
import { Image, View, Pressable, FlatList } from 'react-native';
import { Text } from 'react-native-paper';

export type Service = {
  id: string | number;
  title: string;
  price: string;
  time: string;
  image: string;
  category?: string;
};

type Props = {
  title: string;
  services: Service[];
  onPressItem?: (s: Service) => void;
};

export default function ServicesRow({ title, services, onPressItem }: Props) {
  return (
    <View>
      <Text variant="titleMedium" className="text-text_heading_color px-4">
        {title}
      </Text>
      <FlatList
        data={services}
        keyExtractor={(s) => String(s.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, gap: 12 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onPressItem?.(item)}
            className="w-64 overflow-hidden rounded-2xl bg-white shadow">
            <Image source={{ uri: item.image }} className="h-40 w-full" resizeMode="cover" />
            <View className="p-4">
              <Text className="text-text_heading_color mb-1 font-semibold" numberOfLines={1}>
                {item.title}
              </Text>
              <View className="flex-row items-center justify-between">
                <Text className="text-primary font-bold">{item.price}</Text>
                <Text className="text-onSurfaceVariant">{item.time}</Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
