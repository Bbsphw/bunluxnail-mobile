// // src/app/(auth)/forgot-password.tsx

// import React, { useEffect, useState } from 'react';
// import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Button, Text } from 'react-native-paper';
// import { Controller, useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useRouter } from 'expo-router';
// import { InputField } from '@/components/form/fields';

// const ForgotSchema = z.object({
//   email: z.string().email('Invalid email'),
// });

// type ForgotForm = z.infer<typeof ForgotSchema>;
// const RESEND_SECONDS = 30;

// export default function ForgotPassword() {
//   const router = useRouter();
//   const [left, setLeft] = useState(0);
//   const [sending, setSending] = useState(false);

//   const {
//     control,
//     handleSubmit,
//     formState: { errors, isValid, isSubmitting },
//   } = useForm<ForgotForm>({
//     resolver: zodResolver(ForgotSchema),
//     defaultValues: { email: '' },
//     mode: 'onChange',
//   });

//   useEffect(() => {
//     if (left <= 0) return;
//     const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
//     return () => clearInterval(t);
//   }, [left]);

//   const onSubmit = async (data: ForgotForm) => {
//     setSending(true);
//     // TODO: call backend เพื่อส่ง OTP ไปอีเมล
//     await new Promise((r) => setTimeout(r, 800));
//     setSending(false);
//     setLeft(RESEND_SECONDS);
//     // ไปหน้าใส่ OTP หรือจะอยู่หน้าเดิมก็ได้—ที่นี่เลือกไป OTP
//     router.push('/(auth)/sign-up/otp' as const);
//   };

//   return (
//     <SafeAreaView className="bg-background_color flex-1">
//       <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//         <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
//           <View className="bg-secondary_color/80 mx-4 mt-6 rounded-3xl p-5">
//             <Text variant="headlineSmall" className="text-text_heading_color mb-4 font-bold">
//               Forget Password
//             </Text>
//             <Text className="text-text_default_color mb-6">
//               No problem. Just enter your email address below – we’ll send you a OTP Code
//             </Text>

//             <Controller
//               control={control}
//               name="email"
//               render={({ field }) => (
//                 <InputField
//                   //   topLabel="Email Address"
//                   label="Email"
//                   placeholder="you@example.com"
//                   leftIcon="email-outline"
//                   value={field.value}
//                   onBlur={field.onBlur}
//                   onChangeText={field.onChange}
//                   autoCapitalize="none"
//                   keyboardType="email-address"
//                   errorMessage={errors.email?.message}
//                   returnKeyType="done"
//                 />
//               )}
//             />

//             <Button
//               mode="contained"
//               disabled={!isValid || isSubmitting}
//               loading={isSubmitting || sending}
//               onPress={handleSubmit(onSubmit)}
//               style={{ borderRadius: 999, marginTop: 16 }}
//               contentStyle={{ height: 52 }}>
//               Send Email
//             </Button>

//             {/* Countdown */}
//             <View className="mt-6 items-center">
//               <Text>⏳ 00:{left.toString().padStart(2, '0')}</Text>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// app/(auth)/forgot-password.tsx

import * as React from 'react';
import ForgotPasswordScreen from '@/screens/Auth/ForgotPasswordScreen';

export default function ForgotPasswordRoute(): React.JSX.Element {
  return <ForgotPasswordScreen />;
}
