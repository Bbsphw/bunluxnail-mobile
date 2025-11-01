// screens/Auth/SignInScreen.tsx

import * as React from 'react';
import LogoBanLuxNail from '@/components/logo/logo-banluxnail';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, Link } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';
import { InputField, PasswordField } from '@/components/form/fields';
import { useAuth } from '@/providers/auth-provider';
import { useSnackbar } from '@/providers/snackbar-provider';

const SIGNUP_PATH = '/(auth)/sign-up' as const;
const FORGOT_PATH = '/(auth)/forgot-password' as const;
const MAIN_TABS = '/(main)/(tabs)' as const;

const SignInSchema = z.object({
  account: z.string().min(1, 'Email or username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});
type SignInForm = z.infer<typeof SignInSchema>;

export default function SignIn(): React.JSX.Element {
  const router = useRouter();
  const { login } = useAuth();
  const { show } = useSnackbar();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { account: '', password: '' },
    mode: 'onChange',
  });

  const onSubmit = async (data: SignInForm) => {
    const ok = await login(data.account.trim(), data.password);
    if (!ok) return show('Invalid credentials', { variant: 'error' });
    router.replace(MAIN_TABS);
  };

  return (
    <SafeAreaView className="bg-background_color flex-1" edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
          <View className="mt-8 items-center">
            <LogoBanLuxNail />
          </View>

          <View className="bg-secondary_color/80 mx-4 mt-6 rounded-3xl p-5">
            <Controller
              control={control}
              name="account"
              render={({ field }) => (
                <InputField
                  label="Email or username"
                  placeholder="you@example.com"
                  leftIcon="account-outline"
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  autoCapitalize="none"
                  errorMessage={errors.account?.message}
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
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              )}
            />

            <View className="mt-1 flex-row justify-end">
              <Link href={FORGOT_PATH} asChild>
                <Button mode="text" compact>
                  Forget password ?
                </Button>
              </Link>
            </View>

            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
              style={{ marginTop: 12, borderRadius: 999 }}
              contentStyle={{ height: 52 }}>
              SIGN IN
            </Button>

            <View className="mt-4 flex-row items-center justify-center">
              <Text className="text-text_default_color">Don't have an account ? </Text>
              <Link href={SIGNUP_PATH} asChild>
                <Button mode="text" compact>
                  Sign Up
                </Button>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
