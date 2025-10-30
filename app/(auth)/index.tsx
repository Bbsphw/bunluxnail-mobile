// app/(auth)/index.tsx

import { Redirect } from 'expo-router';

export default function AuthIndex() {
  // เข้าหน้าแรกของ Auth flow
  return <Redirect href="/(auth)/sign-in" />;
}
