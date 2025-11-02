// // components/home/HeroGlassCard.tsx
// import * as React from 'react';
// import { View } from 'react-native';
// import { BlurView } from 'expo-blur';
// import { Button, Text, Chip, Icon } from 'react-native-paper';

// type Props = {
//   rating: number;
//   reviews: number;
//   hours: string;
//   shortAddress: string;
//   onMaps?: () => void;
// };

// export default function HeroGlassCard({ rating, reviews, hours, shortAddress, onMaps }: Props) {
//   return (
//     <View className="px-4">
//       <BlurView intensity={40} tint="light" className="overflow-hidden rounded-2xl">
//         <View className="p-14px px-4 py-3">
//           <View className="gap-8px flex-row flex-wrap">
//             <Chip compact icon="star-outline">
//               {rating.toFixed(1)} · {reviews} รีวิว
//             </Chip>
//             <Chip compact icon="clock-outline">
//               {hours}
//             </Chip>
//             <Chip compact icon="map-marker-outline">
//               {shortAddress}
//             </Chip>
//           </View>

//           <View className="mt-3 flex-row gap-3">
//             <Button
//               mode="contained"
//               icon="map-marker"
//               onPress={onMaps}
//               className="rounded-lg"
//               contentStyle={{ height: 44 }}>
//               Open in Maps
//             </Button>
//             <Button mode="text" icon={() => <Icon source="information-outline" size={18} />}>
//               Details
//             </Button>
//           </View>
//         </View>
//       </BlurView>
//     </View>
//   );
// }

import * as React from 'react';
import { View, Linking, Alert } from 'react-native';
import { Text, Button } from 'react-native-paper';

type Props = {
  rating: number;
  reviews: number;
  hours: string;
  shortAddress: string;
  onMaps: () => void;
  phone?: string;
};

const Chip = ({ children }: { children: React.ReactNode }) => (
  <View className="flex-row items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5">
    {children}
  </View>
);

export default function HeroGlassCard({
  rating,
  reviews,
  hours,
  shortAddress,
  onMaps,
  phone,
}: Props) {
  const onCall = React.useCallback(() => {
    if (!phone) {
      Alert.alert('No phone number', 'This shop has no phone number listed.');
      return;
    }
    const tel = phone.replace(/\s/g, '0');
    const url = `tel:${tel}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) return Linking.openURL(url);
        Alert.alert('Cannot open dialer', 'Your device does not support phone calls.');
      })
      .catch(() => Alert.alert('Error', 'Unable to open dialer.'));
  }, [phone]);

  return (
    <View className="rounded-2xl bg-white/85 p-4 shadow-md">
      {/* Info Chips */}
      <View className="mb-3 flex-row flex-wrap items-center gap-3">
        {/* <Chip>
          <Text>⭐</Text>
          <Text className="font-medium">{rating.toFixed(1)}</Text>
          <Text className="text-onSurfaceVariant text-xs">({reviews})</Text>
        </Chip> */}
        <Chip>
          <Text>🕑</Text>
          <Text className="font-medium">{hours}</Text>
        </Chip>
        <Chip>
          <Text>📍</Text>
          <Text className="font-medium">{shortAddress}</Text>
        </Chip>
      </View>

      {/* Action Buttons */}
      <View className="mt-2 flex-row gap-3">
        <View className="flex-1">
          <Button
            mode="contained"
            icon="map-marker"
            onPress={onMaps}
            className="rounded-xl"
            contentStyle={{ height: 46 }}>
            Maps
          </Button>
        </View>
        <View className="flex-1">
          <Button
            mode="outlined"
            icon="phone"
            onPress={onCall}
            className="rounded-xl"
            contentStyle={{ height: 46 }}>
            Call
          </Button>
        </View>
      </View>
    </View>
  );
}
