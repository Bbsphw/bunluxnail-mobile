// screens/Auth/ForgotPasswordScreen.tsx

import * as React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { InputField } from '@/components/form/fields';
import { authApi } from '@/services/authApi';
import { useSnackbar } from '@/providers/snackbar-provider';

const OTP_PATH = '/(auth)/sign-up/otp' as const;
const RESEND_SECONDS = 30;

const ForgotSchema = z.object({ email: z.string().email('Invalid email') });
type ForgotForm = z.infer<typeof ForgotSchema>;

export default function ForgotPassword(): React.JSX.Element {
  const router = useRouter();
  const { show } = useSnackbar();
  const [left, setLeft] = React.useState(0);
  const [sending, setSending] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ForgotForm>({
    resolver: zodResolver(ForgotSchema),
    defaultValues: { email: '' },
    mode: 'onChange',
  });

  React.useEffect(() => {
    if (left <= 0) return;
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [left]);

  const onSubmit = async (data: ForgotForm) => {
    setSending(true);
    const res = await authApi.sendOtp(data.email.trim());
    setSending(false);
    if (!res.ok || !res.data.status) return show('Send OTP failed', { variant: 'error' });
    setLeft(RESEND_SECONDS);
    show('OTP sent', { variant: 'success' });
    router.push({ pathname: OTP_PATH, params: { email: data.email } });
  };

  return (
    <SafeAreaView className="bg-background_color flex-1">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
          <View className="bg-secondary_color/80 mx-4 mt-6 rounded-3xl p-5">
            <Text variant="headlineSmall" className="text-text_heading_color mb-4 font-bold">
              Forgot Password
            </Text>
            <Text className="text-text_default_color mb-6">
              Enter your email address and we’ll send you a verification code.
            </Text>

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
                  returnKeyType="done"
                />
              )}
            />

            <Button
              mode="contained"
              disabled={!isValid || isSubmitting}
              loading={isSubmitting || sending}
              onPress={handleSubmit(onSubmit)}
              style={{ borderRadius: 999, marginTop: 16 }}
              contentStyle={{ height: 52 }}>
              Send OTP
            </Button>

            <View className="mt-6 items-center">
              <Text>⏳ 00:{left.toString().padStart(2, '0')}</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
