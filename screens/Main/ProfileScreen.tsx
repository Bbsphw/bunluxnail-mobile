
import {ScrollView, Text, View, TouchableOpacity, ActivityIndicator} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';


import { Avatar, Button, Card, IconButton, Divider, Dialog, Portal  } from 'react-native-paper';
import {useEffect, useState} from "react";

import axios from "axios";

import {jwtDecode} from 'jwt-decode';
import { useAuth } from '@/providers/auth-provider';

import { useNavigation, useRouter, router } from "expo-router";

type TokenPayload = {
    id: number;
    exp: number;
};

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


export default function ProfileScreen() {
    const apiURL = process.env.EXPO_PUBLIC_API_BASE_URL;
    const { logout, user, token } = useAuth();
    const [data, setData] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);

    const router = useRouter();


    console.log(token)
    if (!token) {
        console.log('no token');
    }

    let decoded: { id: any; exp?: number; }
    try{
        decoded = jwtDecode<TokenPayload>(token!);
    }catch (err){
        console.log(err)
    }



    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await axios.get(`${apiURL}/profilewithpic?id=${decoded.id}`,{
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log(res.data)
                setData(res.data);


            } catch (err) {
                console.error("Error fetching Services:", err);
            } finally {
                setLoading(false)
            }
        };
        fetchServices();
    }, []);


    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-white items-center justify-center">
                <ActivityIndicator/>
                <Text className="mt-3 text-base text-gray-500">
                    Loading profile...
                </Text>
            </SafeAreaView>
        );
    }

    const EditProfile = () => {
        router.push("/editProfile")
    }

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    // const data = [
    //     {
    //         "id": 7,
    //         "username": "kanisorn2",
    //         "email": "kanisornkhetkhuean@gmail.com",
    //         "first_name": "Kanisornnnn",
    //         "last_name": "Mmkkkkkk",
    //         "phone": "0800536270",
    //         "gender": "male",
    //         "role": "owner",
    //         "picture_base64": "data:image/png;base64,/9j/4AAQSkZJRgABAQAASABIAAD/"
    //     }
    // ]

  const handleLogout = () => {
      console.log("TAP")
    logout()
    .then(() => {router.replace('/(auth)/sign-in')})
  }

    const AvatarImage = () => {

    if (data?.picture_base64){
        const image = {uri: data?.picture_base64}
        return <Avatar.Image size={125} source={image} />
    }else{
        return <Avatar.Image size={125} source={{uri : "https://imgs.search.brave.com/W1BCkhElwrXZF1D_fTwELUGjJW99eL3c7xtf3wvC6-s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvbWluaW1hbGlz/dC1ibHVlLXVzZXIt/cHJvZmlsZS1pY29u/LWZsYXQtdWktYXZh/dGFyLWRlc2lnbl8x/MzkzNzYxLTMwMTIu/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MCZxPTgw"}} />
    }

  };

    const EditButton = () => (
        <Button  mode="contained" buttonColor={"#fb542b"} onPress={() => EditProfile()}     style={{
            borderRadius: 25,
            width: "100%",
        }}>
            <Text className="text-xl">Edit Profile</Text>
        </Button>
    );

    const BookingHistory = () => (
        <Card.Title
            title="Booking History"
            // subtitle="Card Subtitle"
            left={(props) => <Avatar.Icon {...props} icon="history" />}
            right={(props) => <IconButton {...props} icon="chevron-right"  onPress={() => {handleLogout}} />}
        />
    );

    const ResetPassword = () => (
        <Card.Title
            title="Reset Password"
            // subtitle="Card Subtitle"
            left={(props) => <Avatar.Icon {...props} icon="lock-reset" />}
            right={(props) => <IconButton {...props} icon="chevron-right"  onPress={() => {handleLogout()}} />}
        />
    );

    const Logout = () => (
        <Card.Title
            title="Logout"
            // subtitle="Card Subtitle"
            left={(props) => <Avatar.Icon {...props} style={{ backgroundColor: '#C1121F' }} icon="logout" />}
            right={(props) => <IconButton {...props} icon="chevron-right"  onPress={() => {handleLogout()}} />}
        />
    );




    const ResetPasswordDialog = () => {
        return (
            <View>
                <Button onPress={showDialog}>Show Dialog</Button>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Alert</Dialog.Title>
                        <Dialog.Content>
                            <Text >This is simple dialog</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        );
    }

  return (
      <SafeAreaView className="flex-1 px-5 bg-white" edges={['top']}>
          {visible ?  <ResetPasswordDialog /> :
              <>
              <View className="flex-1 items-center justify-center">
              <Text className="text-2xl font-bold">My Profile</Text>
          </View>
          <View className="flex-[4] ">
              <View className="flex-1 gap-5 flex-row items-center">
                  <AvatarImage />
                  <View className="flex-col gap-5">
                      <View>
                          <Text className="text-xl font-semibold">{data?.first_name} {data?.last_name}</Text>
                          <Text className="text-sm">{data?.email}</Text>
                      </View>
                      <View className="w-[80%] self-center">
                          <EditButton />
                      </View>

                  </View>

              </View>
          </View>
          <View className="flex-[15]">
              <BookingHistory />
              <Divider />
              <ResetPassword />
              <Divider />
              <Logout />
              {/*<TouchableOpacity className="bg-amber-300 " onPress={handleLogout}>*/}
              {/*  <Text className="text-xl font-bold ">Logout</Text>*/}
              {/*</TouchableOpacity>*/}
          </View></>}
      </SafeAreaView>


  );
}