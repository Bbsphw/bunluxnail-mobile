import './global.css'; // Required for NativeWind (tailwind)
import * as React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { PaperProvider, Button, Text } from 'react-native-paper';

// (If you want to customize the Paper theme, you can do it like this)
// const theme = {
//   ...MD3LightTheme,
//   colors: { ...MD3LightTheme.colors, primary: "#7c3aed" },
// };

export default function App() {
  return (
    <SafeAreaProvider>
      {/* Use PaperProvider to wrap the entire app */}
      <PaperProvider /* theme={theme} */>
        {/* Use SafeAreaView from react-native-safe-area-context */}
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right', 'bottom']}>
          <StatusBar style="auto" />
          <View className="flex-1 items-center justify-center bg-white px-6 dark:bg-black">
            <Text variant="headlineMedium" className="text-center">
              BunLux Nail
            </Text>

            <Text className="mt-4 text-center text-zinc-500">
              React Native + NativeWind + React Native Paper
            </Text>

            <View className="mt-6 w-full">
              <Button mode="contained" onPress={() => console.log('Get Started')}>
                Get Started
              </Button>
            </View>
          </View>
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}