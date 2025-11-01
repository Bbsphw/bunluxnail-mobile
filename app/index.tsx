// app/index.tsx

import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from '@/providers/auth-provider';

export default function Index() {
  const router = useRouter();
  const segments = useSegments();
  const { loading, isAuthenticated } = useAuth();

  // ระหว่างโหลด แสดง splash เล็ก ๆ กันกะพริบ/วิ่งลูป
  React.useEffect(() => {
    if (loading) return;
    // ป้องกัน redirect เดิมซ้ำ: เช็ค segment ปัจจุบัน
    const inAuth = segments[0] === '(auth)';
    const inMain = segments[0] === '(main)';
    if (isAuthenticated && !inMain) {
      router.replace('/(main)/(tabs)');
    } else if (!isAuthenticated && !inAuth) {
      router.replace('/(auth)/sign-in');
    }
  }, [loading, isAuthenticated, segments, router]);

  if (loading) {
    return (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
    );
  }

  // ค้างไว้เฉย ๆ ให้ effect ทำงาน
  return <View style={{ flex: 1 }} />;
}