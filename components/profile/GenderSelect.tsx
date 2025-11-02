// // components/profile/GenderSelect.tsx

// import * as React from 'react';
// import { View } from 'react-native';
// import { Button, Menu, Text } from 'react-native-paper';

// type Props = {
//   value: 'male' | 'female';
//   onChange: (g: 'male' | 'female') => void;
//   errorMessage?: string;
//   label?: string;
// };

// export default function GenderSelect({ value, onChange, errorMessage, label = 'Gender' }: Props) {
//   const [open, setOpen] = React.useState(false);

//   return (
//     <View className="mt-3">
//       <Text className="text-text_default_color mb-1">{label}</Text>
//       <Menu
//         visible={open}
//         onDismiss={() => setOpen(false)}
//         anchor={
//           <Button
//             mode="outlined"
//             onPress={() => setOpen(true)}
//             className="rounded-full"
//             contentStyle={{ height: 48 }}>
//             {value === 'male' ? 'Male' : 'Female'}
//           </Button>
//         }>
//         <Menu.Item
//           title="Male"
//           onPress={() => {
//             onChange('male');
//             setOpen(false);
//           }}
//         />
//         <Menu.Item
//           title="Female"
//           onPress={() => {
//             onChange('female');
//             setOpen(false);
//           }}
//         />
//       </Menu>
//       {!!errorMessage && <Text className="mt-1 text-xs text-red-600">{errorMessage}</Text>}
//     </View>
//   );
// }

// components/profile/GenderSelect.tsx
// import * as React from 'react';
// import { View } from 'react-native';
// import { Text, SegmentedButtons, HelperText, useTheme } from 'react-native-paper';

// type Gender = 'male' | 'female';

// type Props = {
//   value: Gender;
//   onChange: (g: Gender) => void;
//   errorMessage?: string;
//   label?: string;
//   testID?: string;
// };

// export default function GenderSelect({
//   value,
//   onChange,
//   errorMessage,
//   label = 'Gender',
//   testID,
// }: Props) {
//   const theme = useTheme();

//   // โทนสี (ให้ contrast ชัดเจน)
//   const activeMaleBg = theme.colors.primary; // สีน้ำตาล/primary ของแอป
//   const activeFemaleBg = '#C67ED9'; // โทนชมพู-ม่วง (ปรับได้)
//   const inactiveBg = theme.colors.surfaceVariant; // พื้นหลังปุ่มที่ไม่ถูกเลือก
//   const inactiveText = theme.colors.onSurfaceVariant;

//   return (
//     <View className="mt-3" testID={testID}>
//       <Text className="text-text_default_color mb-1">{label}</Text>

//       <SegmentedButtons
//         value={value}
//         onValueChange={(v) => onChange(v as Gender)}
//         style={{ borderRadius: 999 }}
//         buttons={[
//           {
//             value: 'male',
//             label: 'Male',
//             icon: 'gender-male',
//             // พื้นหลัง
//             style: {
//               backgroundColor: value === 'male' ? activeMaleBg : inactiveBg,
//               borderRadius: 999,
//             },
//             // สีตัวอักษรตอนถูกเลือก/ไม่ถูกเลือก
//             checkedColor: '#fff',
//             uncheckedColor: inactiveText,
//             labelStyle: {
//               fontWeight: '600',
//             },
//           },
//           {
//             value: 'female',
//             label: 'Female',
//             icon: 'gender-female',
//             style: {
//               backgroundColor: value === 'female' ? activeFemaleBg : inactiveBg,
//               borderRadius: 999,
//             },
//             checkedColor: '#fff',
//             uncheckedColor: inactiveText,
//             labelStyle: {
//               fontWeight: '600',
//             },
//           },
//         ]}
//       />

//       <HelperText type="error" visible={!!errorMessage}>
//         {errorMessage}
//       </HelperText>
//     </View>
//   );
// }

// components/profile/GenderSelect.tsx
import * as React from 'react';
import { View } from 'react-native';
import { Text, SegmentedButtons, HelperText, useTheme } from 'react-native-paper';

export type Gender = 'male' | 'female';

type Props = {
  value: Gender;
  onChange: (g: Gender) => void;
  errorMessage?: string;
  label?: string;
  testID?: string;
};

export default function GenderSelect({
  value,
  onChange,
  errorMessage,
  label = 'Gender',
  testID,
}: Props) {
  const theme = useTheme();

  const activeMaleBg = theme.colors.primary; // โทนหลักของแอป (น้ำตาล)
  const activeFemaleBg = '#C67ED9'; // โทนชมพู/ม่วง
  const inactiveBg = theme.colors.surfaceVariant;
  const inactiveText = theme.colors.onSurfaceVariant;

  return (
    <View className="mt-3" testID={testID}>
      <Text className="text-text_default_color mb-1">{label}</Text>

      <SegmentedButtons
        value={value}
        onValueChange={(v) => onChange(v as Gender)}
        style={{ borderRadius: 999 }}
        density="regular"
        buttons={[
          {
            value: 'male',
            label: 'Male',
            icon: 'gender-male',
            style: {
              backgroundColor: value === 'male' ? activeMaleBg : inactiveBg,
              borderRadius: 999,
            },
            checkedColor: '#fff',
            uncheckedColor: inactiveText,
            labelStyle: { fontWeight: '600' },
          },
          {
            value: 'female',
            label: 'Female',
            icon: 'gender-female',
            style: {
              backgroundColor: value === 'female' ? activeFemaleBg : inactiveBg,
              borderRadius: 999,
            },
            checkedColor: '#fff',
            uncheckedColor: inactiveText,
            labelStyle: { fontWeight: '600' },
          },
        ]}
      />

      <HelperText type="error" visible={!!errorMessage}>
        {errorMessage}
      </HelperText>
    </View>
  );
}
