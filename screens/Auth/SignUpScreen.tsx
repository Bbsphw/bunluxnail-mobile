// screens/Auth/SignUpScreen.tsx

import * as React from 'react';
import LogoBanLuxNail from '@/components/logo/logo-banluxnail';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';
import { InputField, PasswordField } from '@/components/form/fields';
import { useSnackbar } from '@/providers/snackbar-provider';
import { authApi } from '@/services/authApi';

const SIGNIN_PATH = '/(auth)/sign-in' as const;
const PERSONAL_DETAILS_PATH = '/(auth)/sign-up/personal-details' as const;

const SignUpSchema = z
  .object({
    username: z.string().min(4, 'Enter at least 4 characters of your username.'),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters.'),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
  });
type SignUpForm = z.infer<typeof SignUpSchema>;

export default function SignUp(): React.JSX.Element {
  const router = useRouter();
  const { show } = useSnackbar();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: { username: '', email: '', password: '', confirmPassword: '' },
    mode: 'onChange',
  });

  const onSubmit = async (data: SignUpForm) => {
    const res = await authApi.signUp({
      username: data.username.trim(),
      email: data.email.trim(),
      password: data.password,
    });
    if (!res.ok || !res.data.status) return show('Sign up failed', { variant: 'error' });

    show('Account created', { variant: 'success' });
    router.push({ pathname: PERSONAL_DETAILS_PATH, params: { email: data.email } });
  };

  return (
    <SafeAreaView className="bg-background_color flex-1">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 justify-center px-6">
            <View className="mb-8 items-center">
              <LogoBanLuxNail />
            </View>

            <View className="bg-secondary_color/80 rounded-3xl p-5">
              <Controller
                control={control}
                name="username"
                render={({ field }) => (
                  <InputField
                    label="Username"
                    placeholder="yourname"
                    leftIcon="account-outline"
                    value={field.value}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    autoCapitalize="none"
                    errorMessage={errors.username?.message}
                    returnKeyType="next"
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <InputField
                    label="Email"
                    placeholder="you@example.com"
                    leftIcon="email-outline"
                    value={field.value}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    errorMessage={errors.email?.message}
                    returnKeyType="next"
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <PasswordField
                    label="Password"
                    placeholder="••••••••"
                    value={field.value}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    errorMessage={errors.password?.message}
                    returnKeyType="next"
                  />
                )}
              />
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <PasswordField
                    label="Confirm Password"
                    placeholder="••••••••"
                    value={field.value}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    errorMessage={errors.confirmPassword?.message}
                    confirm
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit(onSubmit)}
                  />
                )}
              />
            </View>

            <Button
              mode="contained"
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
              onPress={handleSubmit(onSubmit)}
              style={{ borderRadius: 999, marginTop: 12 }}
              contentStyle={{ height: 52 }}>
              CONTINUE
            </Button>

            <View className="mt-6 flex-row justify-center">
              <Text variant="bodyMedium" className="text-text_default_color">
                Already have an account?{' '}
              </Text>
              <Link href={SIGNIN_PATH} asChild>
                <Button mode="text" compact>
                  Sign In
                </Button>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
