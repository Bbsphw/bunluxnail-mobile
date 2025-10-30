// app/_layout.tsx

import * as React from 'react';
import { Stack } from 'expo-router';
import { AppProvider } from '@/providers/app-provider';

export default function RootLayout(): React.JSX.Element {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AppProvider>
  );
}
