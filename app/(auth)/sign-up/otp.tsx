// // src/app/(auth)/sign-up/otp.tsx

// import React, { useEffect, useRef, useState } from 'react';
// import { View, TextInput as RNTextInput } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Button, Text } from 'react-native-paper';
// import { useRouter } from 'expo-router';

// const OTP_LENGTH = 4; // ฟิกม่าระบุ 4 หลัก
// const RESEND_SECONDS = 30; // เคาท์ดาวน์ 30 วินาที

// export default function OtpScreen() {
//   const router = useRouter();
//   const [code, setCode] = useState<string[]>(Array(OTP_LENGTH).fill(''));
//   const inputs = useRef<Array<RNTextInput | null>>([]);
//   const [left, setLeft] = useState(RESEND_SECONDS);
//   const [resending, setResending] = useState(false);

//   useEffect(() => {
//     const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
//     return () => clearInterval(t);
//   }, []);

//   const handleChange = (text: string, idx: number) => {
//     const next = [...code];
//     next[idx] = text.slice(-1);
//     setCode(next);
//     if (text && idx < OTP_LENGTH - 1) inputs.current[idx + 1]?.focus();
//   };

//   const handleKeyPress = (key: string, idx: number) => {
//     if (key === 'Backspace' && !code[idx] && idx > 0) inputs.current[idx - 1]?.focus();
//   };

//   const onVerify = async () => {
//     const otp = code.join('');
//     if (otp.length !== OTP_LENGTH) return;
//     // TODO: verify OTP กับ backend
//     router.replace('/' as const);
//   };

//   const onResend = async () => {
//     if (left > 0) return;
//     setResending(true);
//     // TODO: เรียก resend OTP จาก backend
//     await new Promise((r) => setTimeout(r, 800));
//     setCode(Array(OTP_LENGTH).fill(''));
//     inputs.current[0]?.focus();
//     setLeft(RESEND_SECONDS);
//     setResending(false);
//   };

//   return (
//     <SafeAreaView className="bg-background_color flex-1 px-6">
//       <View className="mt-8">
//         <Text variant="headlineSmall" className="text-text_heading_color font-bold">
//           Personal Details
//         </Text>
//         <Text className="text-text_default_color mt-2">
//           Please enter the 4-digit verification code sent to your email.
//         </Text>
//       </View>

//       <View className="mt-8 flex-row justify-center">
//         {code.map((digit, idx) => (
//           <RNTextInput
//             key={idx}
//             ref={(el) => {
//               inputs.current[idx] = el;
//             }}
//             value={digit}
//             onChangeText={(t) => handleChange(t, idx)}
//             onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, idx)}
//             keyboardType="number-pad"
//             maxLength={1}
//             style={{
//               width: 52,
//               height: 52,
//               marginHorizontal: 6,
//               borderRadius: 12,
//               borderWidth: 1,
//               borderColor: '#D6C0B3',
//               backgroundColor: '#fff',
//               textAlign: 'center',
//               fontSize: 18,
//               color: '#5E503F',
//             }}
//           />
//         ))}
//       </View>

//       {/* Resend */}
//       <View className="mt-6 items-center">
//         <Text className="text-text_default_color">
//           Didn’t receive OTP ?{' '}
//           <Text
//             className={`font-semibold ${left === 0 ? 'text-primary_color' : 'text-gray-400'}`}
//             onPress={onResend}>
//             Resend OTP
//           </Text>
//         </Text>
//         <View className="mt-2 flex-row items-center">
//           <Text>⏳</Text>
//           <Text className="ml-2">00:{left.toString().padStart(2, '0')}</Text>
//         </View>
//       </View>

//       <Button
//         mode="contained"
//         onPress={onVerify}
//         disabled={code.some((c) => !c) || resending}
//         style={{ marginTop: 24, borderRadius: 999 }}
//         contentStyle={{ height: 52 }}>
//         Verify
//       </Button>
//     </SafeAreaView>
//   );
// }

// app/(auth)/sign-up/otp.tsx

import * as React from 'react';
import OtpScreen from '@/screens/Auth/OtpScreen';

export default function OtpRoute(): React.JSX.Element {
  return <OtpScreen />;
}
