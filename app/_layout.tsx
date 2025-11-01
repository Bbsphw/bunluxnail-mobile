// app/_layout.tsx

import { Stack } from 'expo-router';
import { AppProvider } from '@/providers/app-provider';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import { store } from "./../store";

export default function RootLayout() {
    return (
        <Provider store={store}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <AppProvider>
                    <Stack screenOptions={{ headerShown: false }} />
                </AppProvider>
            </SafeAreaProvider>
        </Provider>
    );
}