// screens/Auth/ResetPasswordScreen.tsx  ← ดึง userId จาก useAuth()

import * as React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { PasswordField } from '@/components/form/fields';
import { authApi } from '@/services/authApi';
import { useSnackbar } from '@/providers/snackbar-provider';
import { useAuth } from '@/providers/auth-provider';

const SIGNIN_PATH = '/(auth)/sign-in' as const;

const ResetSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters.'),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
  });
type ResetForm = z.infer<typeof ResetSchema>;

export default function ResetPassword(): React.JSX.Element {
  const router = useRouter();
  const { show } = useSnackbar();
  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ResetForm>({
    resolver: zodResolver(ResetSchema),
    defaultValues: { password: '', confirmPassword: '' },
    mode: 'onChange',
  });

  const onSubmit = async (data: ResetForm) => {
    if (!user?.id) return show('Missing user id', { variant: 'error' });
    const res = await authApi.resetPasswordWithOtp(user.id, data.password);
    if (!res.ok || !res.data.status) return show('Reset failed', { variant: 'error' });
    show('Password changed', { variant: 'success' });
    router.replace({ pathname: SIGNIN_PATH });
  };

  return (
    <SafeAreaView className="bg-background_color flex-1">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
          <View className="bg-secondary_color/80 mx-4 mt-6 rounded-3xl p-5">
            <Text variant="headlineSmall" className="text-text_heading_color mb-4 font-bold">
              Reset Password
            </Text>

            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <PasswordField
                  label="New Password"
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

            <Button
              mode="contained"
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
              onPress={handleSubmit(onSubmit)}
              style={{ borderRadius: 999, marginTop: 16 }}
              contentStyle={{ height: 52 }}>
              Change Password
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
