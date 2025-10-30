// // src/app/(auth)/sign-in.tsx

// import React from 'react';
// import LogoBanLuxLep from '@/components/logo/logo-banluxlep';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useRouter, Link } from 'expo-router';
// import { Controller, useForm } from 'react-hook-form';
// import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
// import { Button, Text } from 'react-native-paper';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { z } from 'zod';
// import { InputField, PasswordField } from '@/components/form/fields';

// const SignInSchema = z.object({
//   email: z.string().email('Invalid email format'),
//   password: z.string().min(8, 'Password must be at least 8 characters.'),
// });
// type SignInForm = z.infer<typeof SignInSchema>;

// const FORGOT_PATH = '/(auth)/forgot-password' as const;
// const SIGNUP_PATH = '/(auth)/sign-up' as const;

// export default function SignIn() {
//   const router = useRouter();
//   const {
//     control,
//     handleSubmit,
//     formState: { errors, isValid, isSubmitting },
//   } = useForm<SignInForm>({
//     resolver: zodResolver(SignInSchema),
//     defaultValues: { email: '', password: '' },
//     mode: 'onChange',
//   });

//   const onSubmit = async (_data: SignInForm) => {
//     // TODO: authService.signIn(_data)
//     await new Promise((r) => setTimeout(r, 600));
//     router.replace('/'); // route ตาม docs
//   };

//   return (
//     <SafeAreaView className="bg-background_color flex-1">
//       <KeyboardAvoidingView
//         className="flex-1"
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//         <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
//           {/* Logo */}
//           <View className="mt-8 items-center">
//             <LogoBanLuxLep />
//           </View>

//           <View className="bg-secondary_color/80 mx-4 mt-6 rounded-3xl p-5">
//             {/* Email Field */}
//             <Controller
//               control={control}
//               name="email"
//               render={({ field }) => (
//                 <InputField
//                   label="Email"
//                   placeholder="you@example.com"
//                   leftIcon="email-outline"
//                   value={field.value}
//                   onBlur={field.onBlur}
//                   onChangeText={field.onChange}
//                   autoCapitalize="none"
//                   keyboardType="email-address"
//                   errorMessage={errors.email?.message}
//                   returnKeyType="next"
//                 />
//               )}
//             />

//             {/* Password Field */}
//             <Controller
//               control={control}
//               name="password"
//               render={({ field }) => (
//                 <PasswordField
//                   label="Password"
//                   placeholder="••••••••"
//                   value={field.value}
//                   onBlur={field.onBlur}
//                   onChangeText={field.onChange}
//                   errorMessage={errors.password?.message}
//                   returnKeyType="done"
//                   onSubmitEditing={handleSubmit(onSubmit)}
//                 />
//               )}
//             />

//             {/* Forget Link */}
//             <View className="flex-row justify-end">
//               <Link href={FORGOT_PATH} asChild>
//                 <Button mode="text" compact>
//                   Forget password ?
//                 </Button>
//               </Link>
//             </View>

//             {/* SignIn Button */}
//             <Button
//               mode="contained"
//               onPress={handleSubmit(onSubmit)}
//               disabled={!isValid || isSubmitting}
//               loading={isSubmitting}
//               style={{ marginTop: 12, borderRadius: 999 }}
//               contentStyle={{ height: 52 }}>
//               SIGN IN
//             </Button>

//             {/* Don't have an account ? Text/Link */}
//             <View className="mt-4 flex-row items-center justify-center">
//               <Text className="text-text_default_color">Don't have an account ? </Text>
//               <Link href={SIGNUP_PATH} asChild>
//                 <Button mode="text" compact>
//                   Sign Up
//                 </Button>
//               </Link>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// app/(auth)/sign-in.tsx

import * as React from 'react';
import SignInScreen from '@/screens/Auth/SignInScreen';

export default function SignInRoute(): React.JSX.Element {
  return <SignInScreen />;
}
