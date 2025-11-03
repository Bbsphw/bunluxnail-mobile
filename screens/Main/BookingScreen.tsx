// // screens/Main/BookingScreen.tsx
//
// import * as React from 'react';
// import { View, FlatList } from 'react-native';
// import { ActivityIndicator, Button, Card, Text } from 'react-native-paper';
// import { useSnackbar } from '@/providers/snackbar-provider';
//
// type Service = { id: string; name: string; price: number; estMin: number };
//
// export default function BookingScreen(): React.JSX.Element {
//   const { show } = useSnackbar();
//   const [loading, setLoading] = React.useState(true);
//   const [items, setItems] = React.useState<Service[]>([]);
//
//   React.useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         await new Promise((r) => setTimeout(r, 600));
//         const mock: Service[] = [
//           { id: 's1', name: 'Gel Polish', price: 450, estMin: 60 },
//           { id: 's2', name: 'Nail Art', price: 650, estMin: 90 },
//           { id: 's3', name: 'Spa Manicure', price: 550, estMin: 75 },
//         ];
//         if (mounted) setItems(mock);
//       } catch {
//         show('Failed to load services', { variant: 'error' });
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     })();
//     return () => {
//       mounted = false;
//     };
//   }, [show]);
//
//   if (loading) {
//     return (
//       <View className="bg-background_color flex-1 items-center justify-center">
//         <ActivityIndicator />
//         <Text className="text-text_default_color mt-2">Loading services…</Text>
//       </View>
//     );
//   }
//
//   if (items.length === 0) {
//     return (
//       <View className="bg-background_color flex-1 items-center justify-center p-6">
//         <Text className="text-text_default_color">No services available.</Text>
//         <Button className="mt-3" onPress={() => show('Refresh', { variant: 'info' })}>
//           Refresh
//         </Button>
//       </View>
//     );
//   }
//
//   return (
//     <View className="bg-background_color flex-1 p-3">
//       <FlatList
//         data={items}
//         keyExtractor={(it) => it.id}
//         contentContainerStyle={{ gap: 12, paddingBottom: 16 }}
//         renderItem={({ item }) => (
//           <Card>
//             <Card.Title title={item.name} subtitle={`~${item.estMin} min`} />
//             <Card.Content>
//               <Text className="text-text_heading_color">฿{item.price.toFixed(0)}</Text>
//             </Card.Content>
//             <Card.Actions>
//               <Button
//                 mode="contained"
//                 onPress={() => show(`Select ${item.name}`, { variant: 'success' })}>
//                 Choose
//               </Button>
//             </Card.Actions>
//           </Card>
//         )}
//       />
//     </View>
//   );
// }


import {FlatList, Text, View, TouchableOpacity} from "react-native";
import { Avatar, Button, Card, Checkbox} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect, useState} from "react";

import { Svg, G, Path, Defs, ClipPath, Rect } from "react-native-svg";

import { useNavigation, useRouter, router } from "expo-router";
import {useIsFocused} from "@react-navigation/native";

import { RootState } from "@/store";
import { toggleService } from "@/features/counterSlice";
import {useDispatch, useSelector} from "react-redux";

import axios from "axios";

import {jwtDecode} from 'jwt-decode';
import { useAuth } from '@/providers/auth-provider';

type TokenPayload = {
    id: number;
    exp: number;
};

export default function BookingScreen() {
    const apiURL = process.env.EXPO_PUBLIC_API_BASE_URL;
    const navigation = useNavigation();
    const router = useRouter();
    const isFocused = useIsFocused();
    const totalServices = useSelector((state: RootState) => state.counter.totalServices);
    const [data, setData] =useState([])

    const { token } = useAuth();
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
        if (isFocused) {
            navigation.setOptions({ tabBarStyle: { display: "none" } });
            console.log("Booking focused");

            const fetchServices = async () => {
                try {
                    const res = await axios.get(`${apiURL}/services`,{
                        headers:{
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    setData(res.data);


                } catch (err) {
                    console.error("Error fetching Services:", err);
                }
            };
            fetchServices();

        } else {
            navigation.setOptions({tabBarStyle: {display: "flex"}});
            console.log("Booking unfocused");
        }
    },[isFocused])

    // const data = [
    //     {
    //         id : 1,
    //         title : "Gel Nails",
    //         subtitle : "Gel polish application for a long-lasting, chip-resistant finish.",
    //         picture : "https://t4.ftcdn.net/jpg/02/18/18/55/360_F_218185587_P4zituDtWJOfClUKL6merI0BgLMIxoeC.jpg",
    //         price : 100
    //     },
    //     {
    //         id:2,
    //         title : "Nail Extensions",
    //         subtitle: "Enhance your natural nails with extensions for added length and strength.",
    //         picture : "https://t4.ftcdn.net/jpg/02/18/18/55/360_F_218185587_P4zituDtWJOfClUKL6merI0BgLMIxoeC.jpg",
    //         price : 100
    //     },
    //     {
    //         id:3,
    //         title : "Manicure",
    //         subtitle: "Classic nail care treatment including shaping, cuticle care, and polish.",
    //         picture : "https://t4.ftcdn.net/jpg/02/18/18/55/360_F_218185587_P4zituDtWJOfClUKL6merI0BgLMIxoeC.jpg",
    //         price : 20
    //     }
    // ]

    const handleDisableNextButton = () => {
        if(totalServices > 0){
            router.push("/dateTimePicker")
            console.log("Push dateTimePicker");
        }
    }


    return (
        // <SafeAreaProvider style={{}}>
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <View className="flex-1 px-5" >
                <View className="flex-[1.5] justify-center bg-white shadow-md" style={{marginHorizontal : -20}}>
                    <View className="flex-row justify-between px-5">
                        <Svg width={24} height={24} viewBox="0 0 24 24" onPress={() => { navigation.setOptions({ tabBarStyle: { display: "flex" } }); router.push('/');}}>
                            <G clipPath="url(#clip0_174_199)">
                                <Path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M19.2806 18.2194C19.5737 18.5124 19.5737 18.9876 19.2806 19.2806C18.9876 19.5737 18.5124 19.5737 18.2194 19.2806L12 13.0603L5.78062 19.2806C5.48757 19.5737 5.01243 19.5737 4.71938 19.2806C4.42632 18.9876 4.42632 18.5124 4.71938 18.2194L10.9397 12L4.71938 5.78062C4.42632 5.48757 4.42632 5.01243 4.71938 4.71938C5.01243 4.42632 5.48757 4.42632 5.78062 4.71938L12 10.9397L18.2194 4.71938C18.5124 4.42632 18.9876 4.42632 19.2806 4.71938C19.5737 5.01243 19.5737 5.48757 19.2806 5.78062L13.0603 12L19.2806 18.2194Z"
                                    fill="#171217"
                                />
                            </G>
                            <Defs>
                                <ClipPath id="clip0_174_199">
                                    <Rect width={24} height={24} fill="white" />
                                </ClipPath>
                            </Defs>
                        </Svg>
                        <Text className="text-text_default_color text-2xl font-bold">Select Service</Text>
                        <View></View>
                    </View>

                </View>
                <View className="flex-1 justify-end">
                    <Text className="text-text_default_color text-3xl font-bold">Nail Services</Text>
                </View>
                <View className="flex-1 justify-center pb-2 ">
                    <Text className="text-text_default_color font-light">Choose your perfect nail experience</Text>
                </View>
                <View className="flex-[17]">
                    <FlatList data={data}
                              contentContainerStyle={{marginBottom: 10}}
                              renderItem={({item}) => <RenderServices item={item}/>}/>
                </View>
                <View className="flex-[2]">
                    <TouchableOpacity onPress={handleDisableNextButton} className={totalServices > 0 ? 'bg-[#dda15e] justify-center items-center py-5 rounded-xl ' : 'bg-[#ffe1bf] opacity-50 justify-center items-center py-5 rounded-xl'}>
                        <Text className="font-semibold text-xl text-gray-500">Next (Total Selected {totalServices})</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
        // </SafeAreaProvider>

    )
}


const RenderServices = ({ item }: { item: any }) => {
    const dispatch = useDispatch();
    const selectedServices = useSelector(
        (state: RootState) => state.counter.selectedServices
    );

    const isSelected = selectedServices.includes(item.id);

    const handlePress = () => {
        dispatch(toggleService(item.id));
    };

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
            <Card
                style={{
                    marginBottom: 15,
                    borderColor: isSelected ? "#00A7A7" : "transparent",
                    borderWidth: 2,
                    backgroundColor: isSelected ? "#EAF6F6" : "#FFF",
                    borderRadius: 12,
                }}
            >
                <Card.Title
                    title={item.title}
                    subtitle={item.subtitle}
                    titleStyle={{ fontWeight: "bold" }}
                    subtitleNumberOfLines={3}
                    left={(props) => (
                        <Avatar.Image
                            {...props}
                            size={50}
                            source={{ uri: item.picture }}
                            className="bg-transparent"
                        />
                    )}
                    right={() => (
                        <Text className="text-secondary_color text-xl font-semibold mr-6">
                            {item.price}฿
                        </Text>
                    )}
                />
            </Card>
        </TouchableOpacity>
    );
};
