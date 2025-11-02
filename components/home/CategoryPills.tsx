// // components/home/CategoryPills.tsx
// import * as React from 'react';
// import { ScrollView, View } from 'react-native';
// import { Chip } from 'react-native-paper';

// const DEFAULTS = ['All', 'Classic', 'Gel', 'Acrylic', 'Spa', 'Design', 'Care'];

// type Props = {
//   items?: string[];
//   active?: string;
//   onChange?: (v: string) => void;
// };

// export default function CategoryPills({ items = DEFAULTS, active = 'All', onChange }: Props) {
//   return (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
//       {items.map((it) => (
//         <Chip
//           key={it}
//           mode={active === it ? 'flat' : 'outlined'}
//           selected={active === it}
//           onPress={() => onChange?.(it)}>
//           {it}
//         </Chip>
//       ))}
//     </ScrollView>
//   );
// }

// components/home/CategoryPills.tsx
import * as React from 'react';
import { ScrollView, View, Pressable } from 'react-native';
import { Text } from 'react-native-paper';

type Pill = { id: string; label: string };

type Props = {
  active: string;
  onChange: (id: string) => void;
  items?: Pill[]; // ถ้าไม่ส่ง จะใช้ดีฟอลต์
};

const DEFAULT: Pill[] = [
  { id: 'All', label: 'All' },
  { id: 'Classic', label: 'Classic' },
  { id: 'Gel', label: 'Gel' },
  { id: 'Acrylic', label: 'Acrylic' },
  { id: 'Spa', label: 'Spa' },
];

export default function CategoryPills({ active, onChange, items = DEFAULT }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
      <View className="flex-row gap-2">
        {items.map((p) => {
          const isActive = active === p.id;
          return (
            <Pressable
              key={p.id}
              onPress={() => onChange(p.id)}
              className={`rounded-full px-4 py-2 ${isActive ? 'bg-primary_color' : 'bg-white/80'}`}>
              <Text
                className={`${isActive ? 'text-white' : 'text-text_heading_color'} font-medium`}>
                {p.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
