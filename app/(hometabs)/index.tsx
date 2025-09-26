import { Text, View } from "react-native";
import '../global.css'
import { SafeAreaProvider} from "react-native-safe-area-context";

export default function Index() {
  return (
      // <SafeAreaProvider>
          <View className="flex-1 bg-white">
              <Text className="text-2xl font-bold text-blue-500">
                  Welcome to Nativewind!
              </Text>
          </View>
      // </SafeAreaProvider>

  );
}
