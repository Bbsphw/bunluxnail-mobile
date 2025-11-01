// screens/Auth/OtpScreen.tsx

import * as React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSnackbar } from '@/providers/snackbar-provider';
import { authApi } from '@/services/authApi';
import OtpInput from '@/components/form/OTP/OtpInput';

const OTP_LENGTH = 6 as const;
const RESEND_SECONDS = 60 as const;

export default function OtpScreen(): React.JSX.Element {
  const router = useRouter();
  const { show } = useSnackbar();
  const params = useLocalSearchParams<{ email?: string }>();

  const [code, setCode] = React.useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [left, setLeft] = React.useState<number>(RESEND_SECONDS);
  const [resending, setResending] = React.useState<boolean>(false);

  React.useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const onVerify = async () => {
    const otp = code.join('');
    if (otp.length !== OTP_LENGTH) return;
    const res = await authApi.verifyOtp(params.email ?? '', otp);
    if (!res.ok) return show('Verify failed', { variant: 'error' });
    show('Verified 🎉', { variant: 'success' });
    router.replace({ pathname: '/(main)/(tabs)' });
  };

  const onResend = async () => {
    if (left > 0) return;
    setResending(true);
    const s = await authApi.sendOtp(params.email ?? '');
    setResending(false);
    if (!s.ok || !s.data.status) return show('Resend OTP failed', { variant: 'error' });
    setCode(Array(OTP_LENGTH).fill(''));
    setLeft(RESEND_SECONDS);
    show('OTP sent again', { variant: 'success' });
  };

  return (
    <SafeAreaView className="bg-background_color flex-1 px-6">
      <View className="mt-8">
        <Text variant="headlineSmall" className="text-text_heading_color font-bold">
          Verify Email
        </Text>
        <Text className="text-text_default_color mt-2">
          Enter the {OTP_LENGTH}-digit code sent to {params.email ?? 'your email'}.
        </Text>
      </View>

      <View className="mt-8">
        <OtpInput length={OTP_LENGTH} value={code} onChange={setCode} />
      </View>

      <View className="mt-6 items-center">
        <Text className="text-text_default_color">
          Didn’t receive OTP ?{' '}
          <Text
            className={`${left === 0 ? 'text-primary_color' : 'text-gray-400'} font-semibold`}
            onPress={onResend}>
            Resend OTP
          </Text>
        </Text>
        <View className="mt-2 flex-row items-center">
          <Text>⏳</Text>
          <Text className="ml-2">00:{left.toString().padStart(2, '0')}</Text>
        </View>
      </View>

      <Button
        mode="contained"
        onPress={onVerify}
        disabled={code.some((c) => !c) || resending}
        style={{ marginTop: 24, borderRadius: 999 }}
        contentStyle={{ height: 52 }}>
        Verify
      </Button>
    </SafeAreaView>
  );
}
