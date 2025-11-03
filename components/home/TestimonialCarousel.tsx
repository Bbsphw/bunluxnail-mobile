// // components/home/TestimonialCarousel.tsx
// import * as React from 'react';
// import { View, Dimensions, ScrollView } from 'react-native';
// import { Avatar, Text, Icon } from 'react-native-paper';

// const { width } = Dimensions.get('window');
// const CARD_W = width * 0.8;

// type Item = { id: number; name: string; text: string; avatar?: string; rating?: number };

// type Props = { items: Item[] };

// export default function TestimonialCarousel({ items }: Props) {
//   return (
//     <View className="mt-8">
//       <View className="mb-3 px-4">
//         <Text variant="titleLarge" className="text-text_heading_color">
//           What clients say
//         </Text>
//       </View>
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         snapToInterval={CARD_W + 16}
//         decelerationRate="fast"
//         contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}>
//         {items.map((it) => (
//           <View key={it.id} style={{ width: CARD_W }} className="rounded-2xl bg-white p-4">
//             <View className="flex-row items-center">
//               <Avatar.Image size={36} source={{ uri: it.avatar ?? 'https://i.pravatar.cc/100' }} />
//               <View className="ml-3">
//                 <Text variant="titleMedium">{it.name}</Text>
//                 <View className="flex-row items-center">
//                   <Icon source="star" size={14} color="#eab308" />
//                   <Icon source="star" size={14} color="#eab308" />
//                   <Icon source="star" size={14} color="#eab308" />
//                   <Icon source="star" size={14} color="#eab308" />
//                   <Icon source="star-outline" size={14} color="#eab308" />
//                 </View>
//               </View>
//             </View>
//             <Text className="text-onSurfaceVariant mt-3">{it.text}</Text>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';

type Item = { id: number | string; name: string; text: string };

export default function TestimonialCarousel({ items }: { items: Item[] }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-row gap-12">
        {items.map((t) => (
          <View key={t.id} className="max-w-[280px] rounded-2xl bg-white p-4 shadow-sm">
            <Text className="font-medium">{t.name}</Text>
            <Text className="text-onSurfaceVariant mt-1">{t.text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
