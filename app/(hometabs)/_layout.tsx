import { Stack } from "expo-router";
import { Tabs } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import { store } from "../../store";

export default function RootLayout() {
  return (
      <Provider store={store}>
          <SafeAreaView style={{ flex: 1 }} className="bg-white" edges={[]}>
              <Tabs>
                  <Tabs.Screen name="index" options={{ title: "Home", headerShown : false}}/>
                  <Tabs.Screen name="booking" options={{ title: "Booking", headerShown : false }} />
                  <Tabs.Screen name="chat" options={{ title: "Chat" }} />
                  <Tabs.Screen name="profile" options={{ title: "Profile" }} />
              </Tabs>
          </SafeAreaView>
      </Provider>


  );
}
