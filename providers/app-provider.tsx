// providers/app-provider.tsx

import * as React from 'react';
import { PaperProvider, MD3LightTheme, type MD3Theme } from 'react-native-paper';
import { SnackbarProvider } from './snackbar-provider';
import { AuthProvider } from './auth-provider';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const theme: MD3Theme = {
  ...MD3LightTheme,
  roundness: Platform.select({ ios: 12, android: 10, default: 10 }) ?? 10,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#4B352A',
    background: '#EFEDEE', // สว่างขึ้น อ่านง่าย
    surface: '#FFFFFF', // การ์ดขาว เด่นชัด
    onSurface: '#4A3D34',
    onSurfaceVariant: '#6F6156', // ตัวหนังสือ/ไอคอนรอง
    outline: '#E2D6CD',
    secondaryContainer: '#F5EFEA', // ใช้แทนพื้นม่วงอ่อนยาวๆ
  },
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <PaperProvider
      theme={theme}
      settings={{
        icon: (props) => <MaterialCommunityIcons {...props} />,
      }}>
      <SnackbarProvider>
        {/*{children}*/}
        <AuthProvider>{children}</AuthProvider>
      </SnackbarProvider>
    </PaperProvider>
  );
}
