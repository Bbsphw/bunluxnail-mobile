// app/(auth)/_layout.tsx

import * as React from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout(): React.JSX.Element {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    />
  );
}
