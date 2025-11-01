// // components/form/OTP/OtpInput.tsx

// import * as React from 'react';
// import { useRef } from 'react';
// import { View, TextInput as RNTextInput, StyleSheet } from 'react-native';

// type Props = {
//   length?: number; // default 6
//   value: string[];
//   onChange: (next: string[]) => void;
//   disabled?: boolean;
//   testID?: string;
// };

// export default function OtpInput({
//   length = 6,
//   value,
//   onChange,
//   disabled = false,
//   testID,
// }: Props): React.JSX.Element {
//   const inputs = useRef<Array<RNTextInput | null>>([]);

//   const handleChange = (txt: string, idx: number) => {
//     if (disabled) return;
//     const next = [...value];
//     next[idx] = txt.replace(/[^\d]/g, '').slice(-1);
//     onChange(next);
//     if (txt && idx < length - 1) inputs.current[idx + 1]?.focus();
//   };

//   const handleKeyPress = (key: string, idx: number) => {
//     if (key === 'Backspace' && !value[idx] && idx > 0) inputs.current[idx - 1]?.focus();
//   };

//   return (
//     <View style={styles.row} testID={testID}>
//       {Array.from({ length }).map((_, idx) => (
//         <RNTextInput
//           key={idx}
//           ref={(el) => (inputs.current[idx] = el)}
//           value={value[idx] ?? ''}
//           onChangeText={(t) => handleChange(t, idx)}
//           onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, idx)}
//           keyboardType="number-pad"
//           maxLength={1}
//           editable={!disabled}
//           style={styles.box}
//         />
//       ))}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   row: { flexDirection: 'row', justifyContent: 'center' },
//   box: {
//     width: 52,
//     height: 52,
//     marginHorizontal: 6,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#D6C0B3',
//     backgroundColor: '#fff',
//     textAlign: 'center',
//     fontSize: 18,
//     color: '#5E503F',
//   },
// });

// import * as React from 'react';
// import { useRef } from 'react';
// import { View, TextInput as RNTextInput, StyleSheet } from 'react-native';

// type Props = {
//   length?: number; // default 6
//   value: string[];
//   onChange: (next: string[]) => void;
//   disabled?: boolean;
//   testID?: string;
// };

// export default function OtpInput({
//   length = 6,
//   value,
//   onChange,
//   disabled = false,
//   testID,
// }: Props): React.JSX.Element {
//   const inputs = useRef<Array<RNTextInput | null>>([]);

//   const handleChange = (txt: string, idx: number) => {
//     if (disabled) return;
//     const next = [...value];
//     next[idx] = txt.replace(/[^\d]/g, '').slice(-1);
//     onChange(next);
//     if (txt && idx < length - 1) inputs.current[idx + 1]?.focus();
//   };

//   const handleKeyPress = (key: string, idx: number) => {
//     if (key === 'Backspace' && !value[idx] && idx > 0) inputs.current[idx - 1]?.focus();
//   };

//   return (
//     <View style={styles.row} testID={testID}>
//       {Array.from({ length }).map((_, idx) => (
//         <RNTextInput
//           key={idx}
//           // ref={(el) => (inputs.current[idx] = el)}
//           value={value[idx] ?? ''}
//           onChangeText={(t) => handleChange(t, idx)}
//           onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, idx)}
//           keyboardType="number-pad"
//           maxLength={1}
//           editable={!disabled}
//           style={styles.box}
//         />
//       ))}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   row: { flexDirection: 'row', justifyContent: 'center' },
//   box: {
//     width: 52,
//     height: 52,
//     marginHorizontal: 6,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#D6C0B3',
//     backgroundColor: '#fff',
//     textAlign: 'center',
//     fontSize: 18,
//     color: '#5E503F',
//   },
// });

// components/form/OTP/OtpInput.tsx

import * as React from 'react';
import { useRef, useEffect } from 'react';
import { View, TextInput as RNTextInput, StyleSheet, Platform } from 'react-native';

type Props = {
  length?: number; // default 6
  value: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  testID?: string;
};

export default function OtpInput({
  length = 6,
  value,
  onChange,
  disabled = false,
  autoFocus = true,
  testID,
}: Props): React.JSX.Element {
  const inputs = useRef<Array<RNTextInput | null>>([]);

  // โฟกัสช่องแรกอัตโนมัติ
  useEffect(() => {
    if (autoFocus && !disabled) {
      setTimeout(() => inputs.current[0]?.focus(), 0);
    }
  }, [autoFocus, disabled]);

  const setRef =
    (idx: number) =>
    (el: RNTextInput | null): void => {
      inputs.current[idx] = el; // อย่าคืนค่าใดๆ -> void
    };

  const handleChange = (txt: string, idx: number) => {
    if (disabled) return;

    // รับเฉพาะตัวเลขตัวสุดท้าย (กัน paste แปลกๆ)
    const digit = txt.replace(/[^\d]/g, '').slice(-1);
    const next = [...value];
    next[idx] = digit ?? '';
    onChange(next);

    // ถ้ามีตัวเลขแล้ว → โฟกัสช่องถัดไป
    if (digit && idx < length - 1) {
      inputs.current[idx + 1]?.focus();
    }

    // ถ้าลบจนว่าง และเราเพิ่งกดลบในช่องนี้ → ไม่เปลี่ยนโฟกัส
    // (กรณีอยากย้อนอัตโนมัติ ให้ย้ายไป handleKeyPress)
  };

  const handleKeyPress = (key: string, idx: number) => {
    if (key === 'Backspace') {
      // ถ้าช่องว่างอยู่แล้ว → ย้อนกลับไปช่องก่อนหน้าและลบค่านั้น
      if (!value[idx] && idx > 0) {
        const prev = idx - 1;
        const next = [...value];
        next[prev] = '';
        onChange(next);
        inputs.current[prev]?.focus();
      }
    }
  };

  const handlePaste = (text: string, idx: number) => {
    // อนุญาต paste โค้ดทั้งก้อน (เช่น 6 ตัว)
    const digits = text
      .replace(/[^\d]/g, '')
      .slice(0, length - idx)
      .split('');
    if (digits.length === 0) return;

    const next = [...value];
    for (let i = 0; i < digits.length; i++) {
      next[idx + i] = digits[i];
    }
    onChange(next);

    const lastIndex = Math.min(idx + digits.length - 1, length - 1);
    inputs.current[lastIndex]?.focus();
  };

  return (
    <View style={styles.row} testID={testID}>
      {Array.from({ length }).map((_, idx) => (
        <RNTextInput
          key={idx}
          ref={setRef(idx)}
          value={value[idx] ?? ''}
          onChangeText={(t) => {
            // iOS บางที onKeyPress ไม่ยิงครบ → จัดการ paste/หลายตัวที่นี่ด้วย
            if (t.length > 1) return handlePaste(t, idx);
            handleChange(t, idx);
          }}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, idx)}
          keyboardType={Platform.select({
            ios: 'number-pad',
            android: 'numeric',
            default: 'numeric',
          })}
          inputMode="numeric"
          textContentType="oneTimeCode"
          maxLength={1}
          editable={!disabled}
          style={styles.box}
          returnKeyType={idx === length - 1 ? 'done' : 'next'}
          // กด Enter ที่ช่องสุดท้ายให้ blur
          onSubmitEditing={() => {
            if (idx === length - 1) inputs.current[idx]?.blur();
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'center' },
  box: {
    width: 52,
    height: 52,
    marginHorizontal: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D6C0B3',
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 18,
    color: '#5E503F',
  },
});
