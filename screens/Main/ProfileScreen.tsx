// // screens/Main/ProfileScreen.tsx
//
// import * as React from 'react';
// import { View, Image } from 'react-native';
// import { Button, Card, Divider, List, Text } from 'react-native-paper';
// import { useAuth } from '@/providers/auth-provider';
// import { useSnackbar } from '@/providers/snackbar-provider';
// import { Link } from 'expo-router';
//
// export default function ProfileScreen(): React.JSX.Element {
//   const { user, logout } = useAuth();
//   const { show } = useSnackbar();
//
//   const onLogout = async () => {
//     await logout();
//     show('Signed out', { variant: 'success' });
//   };
//
//   return (
//     <View className="bg-background_color flex-1 p-4">
//       <Card>
//         <Card.Content>
//           <View className="flex-row items-center">
//             {user?.picture_base64 ? (
//               <Image
//                 source={{ uri: user.picture_base64 }}
//                 style={{ width: 64, height: 64, borderRadius: 999, marginRight: 12 }}
//               />
//             ) : (
//               <List.Icon icon="account-circle-outline" />
//             )}
//             <View>
//               <Text variant="titleMedium" className="text-text_heading_color">
//                 {user?.first_name ?? user?.username ?? 'User'}
//               </Text>
//               <Text className="text-text_default_color">{user?.email ?? '-'}</Text>
//             </View>
//           </View>
//         </Card.Content>
//       </Card>
//
//       <Card className="mt-4">
//         <List.Item
//           title="Role"
//           description={user?.role ?? 'user'}
//           left={(p) => <List.Icon {...p} icon="shield-account-outline" />}
//         />
//         <Divider />
//         <List.Item
//           title="Phone"
//           description={user?.phone ?? '-'}
//           left={(p) => <List.Icon {...p} icon="phone-outline" />}
//         />
//         <Divider />
//         <List.Item
//           title="Gender"
//           description={user?.gender ?? '-'}
//           left={(p) => <List.Icon {...p} icon="account-outline" />}
//         />
//       </Card>
//
//       <View className="mt-6 flex-row gap-8">
//         <Link href="/(auth)/reset-password" asChild>
//           <Button mode="outlined" icon="key-variant">
//             Change Password
//           </Button>
//         </Link>
//         <Button mode="contained" icon="logout" onPress={onLogout}>
//           Logout
//         </Button>
//       </View>
//     </View>
//   );
// }

import {ScrollView, Text, View, TouchableOpacity} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import { useAuth } from '@/providers/auth-provider';
import { router } from "expo-router";

export default function ProfileScreen() {
  const { logout, user, token } = useAuth();
  console.log(token)

  const handleLogout = () => {
    logout()
    .then(() => {router.replace('/(auth)/sign-in')})
  }
  return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <View className="flex-1">
          <Text className="text-2xl font-bold text-blue-500">
            Welcome to Profile!
          </Text>
          <Text className="text-2xl font-bold text-blue-500">Welcome to from Thailand</Text>
        </View>

        <View className="flex-1">
          <TouchableOpacity className="bg-amber-300 flex-1" onPress={handleLogout}>
            <Text className="text-xl font-bold ">Logout</Text>
          </TouchableOpacity>

        </View>


      </SafeAreaView>


  );
}