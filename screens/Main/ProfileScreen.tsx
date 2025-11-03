// // screens/Main/ProfileScreen.tsx

// import { Text, View, ActivityIndicator, KeyboardAvoidingView, Platform, Alert } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import { Avatar, Button, Card, IconButton, Divider, Dialog, Portal } from 'react-native-paper';
// import { useEffect, useState } from 'react';

// import axios from 'axios';

// import { jwtDecode } from 'jwt-decode';
// import { useAuth } from '@/providers/auth-provider';

// import { useRouter } from 'expo-router';

// import { PasswordField } from '@/components/form/fields';
// import { resetServices } from '@/features/counterSlice';

// type TokenPayload = {
//   id: number;
//   exp: number;
// };

// type UserProfile = {
//   id: number;
//   username: string;
//   email: string;
//   first_name: string | null;
//   last_name: string | null;
//   phone: string | null;
//   gender: string | null;
//   role: string | null;
//   picture_base64: string | null;
// };

// export default function ProfileScreen() {
//   const apiURL = process.env.EXPO_PUBLIC_API_BASE_URL;
//   const { logout, token } = useAuth();
//   const router = useRouter();

//   const [data, setData] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);

//   // dialog state
//   const [visible, setVisible] = useState(false);
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmNewPassword, setConfirmNewPassword] = useState('');
//   const [error, setError] = useState('');

//   // optional: loading state for API when confirming reset password
//   const [resetSubmitting, setResetSubmitting] = useState(false);

//   // decode token
//   let decoded: { id: any; exp?: number } = { id: null };
//   try {
//     if (token) {
//       decoded = jwtDecode<TokenPayload>(token);
//     }
//   } catch (err) {
//     console.log('jwt decode error:', err);
//   }

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const res = await axios.get(`${apiURL}/profilewithpic?id=${decoded.id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log(res.data);
//         setData(res.data);
//       } catch (err) {
//         console.error('Error fetching Services:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (decoded.id) {
//       fetchServices();
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   // 1. ถ้ายังโหลดอยู่
//   if (loading) {
//     return (
//       <SafeAreaView className="flex-1 items-center justify-center bg-white">
//         <ActivityIndicator />
//         <Text className="mt-3 text-base text-gray-500">Loading profile...</Text>
//       </SafeAreaView>
//     );
//   }

//   // 2. ฟังก์ชันทั่วไป
//   const handleEditProfile = () => {
//     router.push({
//       pathname: '/editProfile',
//       params: {
//         id: data?.id,
//         first_name: data?.first_name,
//         last_name: data?.last_name,
//         email: data?.email,
//         username: data?.username,
//         phone: data?.phone,
//         gender: data?.gender,
//         picture_base64: data?.picture_base64,
//       },
//     });
//   };

//   const handleLogout = () => {
//     console.log('logging out');
//     logout().then(() => {
//       router.replace('/(auth)/sign-in');
//     });
//   };

//   // dialog handlers
//   const showDialog = () => setVisible(true);

//   const hideDialog = () => {
//     setVisible(false);
//     setOldPassword('');
//     setNewPassword('');
//     setConfirmNewPassword('');
//     setError('');
//     setResetSubmitting(false);
//   };

//   const handleConfirmReset = async () => {
//     // 1) validate ก่อนส่ง
//     if (!oldPassword || !newPassword || !confirmNewPassword) {
//       setError('Please fill in all fields.');
//       return;
//     }

//     if (newPassword !== confirmNewPassword) {
//       setError('Passwords do not match!');
//       return;
//     }

//     try {
//       setResetSubmitting(true); // ปิดปุ่ม / ใส่ spinner ที่ปุ่ม Confirm

//       // 2) เรียก API reset password
//       const res = await axios.post(
//         `${apiURL}/reset-password`,
//         {
//           old_password: oldPassword,
//           new_password: newPassword,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log('reset password response:', res.data);

//       // 3) ตีความผลลัพธ์จาก backend
//       if (res.data.status === true) {
//         Alert.alert('Password Updated ✅', 'Your password has been changed successfully.', [
//           {
//             text: 'OK',
//             onPress: () => {
//               // ปิด dialog หลังผู้ใช้กด OK
//               hideDialog();
//             },
//           },
//         ]);
//       } else {
//         Alert.alert('Update Failed ❌', res.data.message || 'Please try again later.');
//         // ไม่ hideDialog ที่นี่นะ เพราะ user อาจอยากแก้รหัสใหม่แล้วส่งอีก
//       }
//     } catch (err) {
//       console.error('Reset password error:', err);
//       Alert.alert('Error ❌', 'Something went wrong while updating your password.');
//       // ไม่ปิด dialog -> ให้เขาแก้รหัสและลองอีกครั้งได้
//     } finally {
//       // 4) ปล่อยปุ่ม confirm ให้กดใหม่ได้
//       setResetSubmitting(false);
//     }
//   };

//   // 3. small UI subcomponents
//   const AvatarImage = () => {
//     if (data?.picture_base64) {
//       return <Avatar.Image size={125} source={{ uri: data.picture_base64 }} />;
//     } else {
//       return (
//         <Avatar.Image
//           size={125}
//           source={{
//             uri: 'https://imgs.search.brave.com/W1BCkhElwrXZF1D_fTwELUGjJW99eL3c7xtf3wvC6-s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvbWluaW1hbGlz/dC1ibHVlLXVzZXIt/cHJvZmlsZS1pY29u/LWZsYXQtdWktYXZh/dGFyLWRlc2lnbl8x/MzkzNzYxLTMwMTIu/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MCZxPTgw',
//           }}
//         />
//       );
//     }
//   };

//   const EditButton = () => (
//     <Button
//       mode="contained"
//       buttonColor={'#fb542b'}
//       onPress={handleEditProfile}
//       style={{
//         borderRadius: 25,
//         width: '100%',
//       }}>
//       <Text className="text-xl text-white">Edit Profile</Text>
//     </Button>
//   );

//   const BookingHistoryRow = () => (
//     <Card.Title
//       title="Booking History"
//       left={(props) => <Avatar.Icon {...props} icon="history" />}
//       right={(props) => (
//         <IconButton
//           {...props}
//           icon="chevron-right"
//           onPress={() => {
//             console.log('Go to booking history');
//             // router.push("/bookingHistory")
//           }}
//         />
//       )}
//     />
//   );

//   const ResetPasswordRow = () => (
//     <Card.Title
//       title="Reset Password"
//       left={(props) => <Avatar.Icon {...props} icon="lock-reset" />}
//       right={(props) => <IconButton {...props} icon="chevron-right" onPress={showDialog} />}
//     />
//   );

//   const LogoutRow = () => (
//     <Card.Title
//       title="Logout"
//       left={(props) => (
//         <Avatar.Icon
//           {...props}
//           style={{ backgroundColor: '#C1121F' }}
//           icon="logout"
//           color="white"
//         />
//       )}
//       right={(props) => <IconButton {...props} icon="chevron-right" onPress={handleLogout} />}
//     />
//   );

//   return (
//     <SafeAreaView className="flex-1 bg-white px-5" edges={['top']}>
//       {/* ---------- Profile Header ---------- */}
//       <View className="flex-1 items-center justify-center">
//         <Text className="text-2xl font-bold">My Profile</Text>
//       </View>

//       {/* ---------- Avatar + Info + Edit Button ---------- */}
//       <View className="flex-[4] ">
//         <View className="flex-1 flex-row items-center gap-5">
//           <AvatarImage />
//           <View className="flex-col gap-5">
//             <View>
//               <Text className="text-xl font-semibold">
//                 {data?.first_name} {data?.last_name}
//               </Text>
//               <Text className="text-sm">{data?.email}</Text>
//             </View>

//             <View className="w-[80%] self-center">
//               <EditButton />
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* ---------- Action Rows ---------- */}
//       <View className="flex-[15]">
//         <BookingHistoryRow />
//         <Divider />
//         <ResetPasswordRow />
//         <Divider />
//         <LogoutRow />
//       </View>

//       {/* ---------- Reset Password Dialog ---------- */}
//       <Portal>
//         <KeyboardAvoidingView
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//           style={{ flex: 1 }}>
//           <Dialog
//             visible={visible}
//             onDismiss={hideDialog}
//             style={{
//               borderRadius: 0,
//               backgroundColor: 'white',
//             }}>
//             <Dialog.Title>Reset Password</Dialog.Title>

//             <Dialog.Content>
//               <PasswordField
//                 topLabel="Old Password"
//                 label="Password"
//                 value={oldPassword}
//                 onChangeText={setOldPassword}
//                 placeholder="••••••••"
//               />

//               <PasswordField
//                 topLabel="New Password"
//                 label="Password"
//                 value={newPassword}
//                 onChangeText={setNewPassword}
//                 placeholder="••••••••"
//               />

//               <PasswordField
//                 topLabel="Confirm New Password"
//                 label="Password"
//                 confirm
//                 value={confirmNewPassword}
//                 onChangeText={setConfirmNewPassword}
//                 placeholder="••••••••"
//                 errorMessage={
//                   error && newPassword !== confirmNewPassword ? 'Passwords do not match!' : ''
//                 }
//               />

//               {error ? (
//                 <Text
//                   style={{
//                     color: 'red',
//                     marginTop: 8,
//                     textAlign: 'center',
//                   }}>
//                   {error}
//                 </Text>
//               ) : null}
//             </Dialog.Content>

//             <Dialog.Actions>
//               <Button onPress={hideDialog} textColor="#888">
//                 Cancel
//               </Button>
//               <Button
//                 onPress={handleConfirmReset}
//                 disabled={resetSubmitting}
//                 loading={resetSubmitting}>
//                 Confirm
//               </Button>
//             </Dialog.Actions>
//           </Dialog>
//         </KeyboardAvoidingView>
//       </Portal>
//     </SafeAreaView>
//   );
// }

// screens/Main/ProfileScreen.tsx
import { Text, View, ActivityIndicator, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Button, Card, IconButton, Divider, Dialog, Portal } from 'react-native-paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '@/providers/auth-provider';
import { useRouter } from 'expo-router';
import { PasswordField } from '@/components/form/fields';
import BookingHistoryDialog from '@/components/profile/BookingHistoryDialog';

type TokenPayload = { id: number; exp: number };
type UserProfile = {
  id: number;
  username: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  gender: string | null;
  role: string | null;
  picture_base64: string | null;
};

export default function ProfileScreen(): React.JSX.Element {
  const apiURL = process.env.EXPO_PUBLIC_API_BASE_URL;
  const { logout, token } = useAuth();
  const router = useRouter();

  const [data, setData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // dialogs
  const [visible, setVisible] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  // password states
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [resetSubmitting, setResetSubmitting] = useState(false);

  // decode token
  let decoded: { id: number | null; exp?: number } = { id: null };
  try {
    if (token) decoded = jwtDecode<TokenPayload>(token);
  } catch (err) {
    console.log('jwt decode error:', err);
  }

  useEffect(() => {
    const fetchProfile = async () => {
      if (!decoded.id) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${apiURL}/profilewithpic?id=${decoded.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [decoded.id, apiURL, token]);

  if (loading)
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator />
        <Text className="mt-3 text-base text-gray-500">Loading profile...</Text>
      </SafeAreaView>
    );

  const handleEditProfile = () => {
    if (!data) return;
    router.push({
      pathname: '/editProfile',
      params: {
        id: data.id,
        first_name: data.first_name ?? '',
        last_name: data.last_name ?? '',
        email: data.email,
        username: data.username,
        phone: data.phone ?? '',
        gender: data.gender ?? '',
        picture_base64: data.picture_base64 ?? '',
      },
    });
  };

  const handleLogout = () => {
    logout().then(() => router.replace('/(auth)/sign-in'));
  };

  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setError('');
    setResetSubmitting(false);
  };

  const handleConfirmReset = async () => {
    if (!oldPassword || !newPassword || !confirmNewPassword)
      return setError('Please fill in all fields.');
    if (newPassword !== confirmNewPassword) return setError('Passwords do not match!');
    try {
      setResetSubmitting(true);
      const res = await axios.post(
        `${apiURL}/reset-password`,
        { old_password: oldPassword, new_password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.status) {
        Alert.alert('Password Updated ✅', 'Your password has been changed successfully.', [
          { text: 'OK', onPress: hideDialog },
        ]);
      } else {
        Alert.alert('Update Failed ❌', res.data.message || 'Please try again later.');
      }
    } catch (err) {
      console.error('Reset password error:', err);
      Alert.alert('Error ❌', 'Something went wrong while updating your password.');
    } finally {
      setResetSubmitting(false);
    }
  };

  // --- subcomponents ---
  const AvatarImage = () =>
    data?.picture_base64 ? (
      <Avatar.Image size={125} source={{ uri: data.picture_base64 }} />
    ) : (
      <Avatar.Image
        size={125}
        source={{
          uri: 'https://api.dicebear.com/7.x/initials/png?seed=BN',
        }}
      />
    );

  const EditButton = () => (
    <Button
      mode="contained"
      buttonColor="#fb542b"
      onPress={handleEditProfile}
      style={{ borderRadius: 25, width: '100%' }}>
      <Text className="text-xl text-white">Edit Profile</Text>
    </Button>
  );

  const BookingHistoryRow = () => (
    <Card.Title
      title="Booking History"
      left={(props) => <Avatar.Icon {...props} icon="history" />}
      right={(props) => (
        <IconButton {...props} icon="chevron-right" onPress={() => setHistoryOpen(true)} />
      )}
    />
  );

  const ResetPasswordRow = () => (
    <Card.Title
      title="Reset Password"
      left={(props) => <Avatar.Icon {...props} icon="lock-reset" />}
      right={(props) => <IconButton {...props} icon="chevron-right" onPress={showDialog} />}
    />
  );

  const LogoutRow = () => (
    <Card.Title
      title="Logout"
      left={(props) => (
        <Avatar.Icon
          {...props}
          style={{ backgroundColor: '#C1121F' }}
          icon="logout"
          color="white"
        />
      )}
      right={(props) => <IconButton {...props} icon="chevron-right" onPress={handleLogout} />}
    />
  );

  // --- UI ---
  return (
    <SafeAreaView className="flex-1 bg-white px-5" edges={['top']}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold">My Profile</Text>
      </View>

      {/* Avatar + Info */}
      <View className="flex-[4]">
        <View className="flex-1 flex-row items-center gap-5">
          <AvatarImage />
          <View className="flex-col gap-5">
            <View>
              <Text className="text-xl font-semibold">
                {data?.first_name} {data?.last_name}
              </Text>
              <Text className="text-sm">{data?.email}</Text>
            </View>
            <View className="w-[80%] self-center">
              <EditButton />
            </View>
          </View>
        </View>
      </View>

      {/* Rows */}
      <View className="flex-[15]">
        <BookingHistoryRow />
        <Divider />
        <ResetPasswordRow />
        <Divider />
        <LogoutRow />
      </View>

      {/* Reset Password Dialog */}
      <Portal>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}>
          <Dialog
            visible={visible}
            onDismiss={hideDialog}
            style={{
              borderRadius: 0,
              backgroundColor: 'white',
            }}>
            <Dialog.Title>Reset Password</Dialog.Title>

            <Dialog.Content>
              <PasswordField
                topLabel="Old Password"
                label="Password"
                value={oldPassword}
                onChangeText={setOldPassword}
                placeholder="••••••••"
              />

              <PasswordField
                topLabel="New Password"
                label="Password"
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="••••••••"
              />

              <PasswordField
                topLabel="Confirm New Password"
                label="Password"
                confirm
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
                placeholder="••••••••"
                errorMessage={
                  error && newPassword !== confirmNewPassword ? 'Passwords do not match!' : ''
                }
              />

              {error ? (
                <Text
                  style={{
                    color: 'red',
                    marginTop: 8,
                    textAlign: 'center',
                  }}>
                  {error}
                </Text>
              ) : null}
            </Dialog.Content>

            <Dialog.Actions>
              <Button onPress={hideDialog} textColor="#888">
                Cancel
              </Button>
              <Button
                onPress={handleConfirmReset}
                disabled={resetSubmitting}
                loading={resetSubmitting}>
                Confirm
              </Button>
            </Dialog.Actions>
          </Dialog>
        </KeyboardAvoidingView>
      </Portal>

      {/* Booking History Dialog */}
      <BookingHistoryDialog visible={historyOpen} onClose={() => setHistoryOpen(false)} />
    </SafeAreaView>
  );
}
