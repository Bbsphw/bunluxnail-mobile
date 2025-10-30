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
    primary: '#4B352A', // primary_color
    background: '#E4E0E1', // background_color
    secondary: '#D6C0B3', // secondary_color
    onSurface: '#5E503F', // text_default_color
    outline: '#D6C0B3',
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
        <AuthProvider>{children}</AuthProvider>
      </SnackbarProvider>
    </PaperProvider>
  );
}
