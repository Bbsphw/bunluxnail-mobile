// // src/app/(auth)/reset-password.tsx

// import React from 'react';
// import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Button, Text } from 'react-native-paper';
// import { Controller, useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useRouter } from 'expo-router';
// import { PasswordField } from '@/components/form/fields';

// const ResetSchema = z
//   .object({
//     password: z.string().min(8, 'Password must be at least 8 characters.'),
//     confirmPassword: z.string().min(8, 'Password must be at least 8 characters.'),
//   })
//   .refine((v) => v.password === v.confirmPassword, {
//     path: ['confirmPassword'],
//     message: "Passwords don't match",
//   });

// type ResetForm = z.infer<typeof ResetSchema>;

// export default function ResetPassword() {
//   const router = useRouter();
//   const {
//     control,
//     handleSubmit,
//     formState: { errors, isValid, isSubmitting },
//   } = useForm<ResetForm>({
//     resolver: zodResolver(ResetSchema),
//     defaultValues: { password: '', confirmPassword: '' },
//     mode: 'onChange',
//   });

//   const onSubmit = async (data: ResetForm) => {
//     // TODO: call backend เพื่อเปลี่ยนรหัสผ่าน
//     await new Promise((r) => setTimeout(r, 800));
//     router.replace('/(auth)/sign-in' as const);
//   };

//   return (
//     <SafeAreaView className="bg-background_color flex-1">
//       <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//         <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
//           <View className="bg-secondary_color/80 mx-4 mt-6 rounded-3xl p-5">
//             <Text variant="headlineSmall" className="text-text_heading_color mb-4 font-bold">
//               Reset Password
//             </Text>

//             <Controller
//               control={control}
//               name="password"
//               render={({ field }) => (
//                 <PasswordField
//                   //   topLabel="New Password"
//                   label="New Password"
//                   placeholder="••••••••"
//                   value={field.value}
//                   onBlur={field.onBlur}
//                   onChangeText={field.onChange}
//                   errorMessage={errors.password?.message}
//                   returnKeyType="next"
//                 />
//               )}
//             />

//             <Controller
//               control={control}
//               name="confirmPassword"
//               render={({ field }) => (
//                 <PasswordField
//                   //   topLabel="Confirm Password"
//                   label="Confirm Password"
//                   placeholder="••••••••"
//                   value={field.value}
//                   onBlur={field.onBlur}
//                   onChangeText={field.onChange}
//                   errorMessage={errors.confirmPassword?.message}
//                   confirm
//                   returnKeyType="done"
//                   onSubmitEditing={handleSubmit(onSubmit)}
//                 />
//               )}
//             />

//             <Button
//               mode="contained"
//               disabled={!isValid || isSubmitting}
//               loading={isSubmitting}
//               onPress={handleSubmit(onSubmit)}
//               style={{ borderRadius: 999, marginTop: 16 }}
//               contentStyle={{ height: 52 }}>
//               Change Password
//             </Button>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// app/(auth)/reset-password.tsx

import * as React from 'react';
import ResetPasswordScreen from '@/screens/Auth/ResetPasswordScreen';

export default function ResetPasswordRoute(): React.JSX.Element {
  return <ResetPasswordScreen />;
}
