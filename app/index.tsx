// app/index.tsx

import * as React from 'react';
import { useEffect } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '@/providers/auth-provider';

export default function Gate(): React.JSX.Element {
  const router = useRouter();
  const { loading, token } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (token)
      router.replace('/'); // fix it -> app/(main)/(tabs)
    else router.replace('/(auth)/sign-in');
  }, [loading, token, router]);

  return (
    <View className="bg-background_color flex-1 items-center justify-center">
      <ActivityIndicator />
      <Text className="text-text_default_color mt-2">Loading…</Text>
    </View>
  );
}
