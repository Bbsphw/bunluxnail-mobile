import {View, Text, TouchableOpacity, FlatList, ScrollView, Alert} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import { Svg, G, Path, Defs, ClipPath, Rect } from "react-native-svg";
import React, {useEffect, useState} from "react";
import { Calendar, CalendarList } from "react-native-calendars";
import { useNavigation, useRouter, router } from "expo-router";
import {useIsFocused} from "@react-navigation/native";
import axios from "axios";

import {jwtDecode} from 'jwt-decode';
import { useAuth } from '@/providers/auth-provider';


import {resetServices} from "@/features/counterSlice";
import {useDispatch, useSelector, Provider} from "react-redux";
import {RootState, store} from "@/store";

type TokenPayload = {
    id: number;
    exp: number;
};

export default function DateTimePicker(){
    const apiURL = process.env.EXPO_PUBLIC_API_BASE_URL;
    const [selectedDate, setSelectedDate] = useState(new Date(
        new Date().getTime() + 7 * 60 * 60 * 1000
    )
        .toISOString()
        .split("T")[0]);
    const [selectedTime, setSelectedTime] = useState("");
    const [availableTime, setAvailableTime] = useState([])
    const dispatch = useDispatch();

    // const availableTime = ['12:00', '14:00', '16:00', '18:00']


    const navigation = useNavigation();
    const router = useRouter();
    const isFocused = useIsFocused();

    const selectedServices = useSelector(
        (state: RootState) => state.counter.selectedServices
    );

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
        const fetchAvailableTime = async () => {
            try {
                const res = await axios.get(`${apiURL}/availableTime`, {
                    params: { date : selectedDate },
                    headers : {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setAvailableTime(res.data);

                // setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
            } catch (err) {
                console.error("Error fetching chat:", err);
            }
        };
        fetchAvailableTime();
    }, [selectedDate]);

    const handleBookAppointmentButton = () => {
        if (selectedDate !== "" && selectedTime !== "") {
            // ⛔ ก่อนเรียก addReservation ให้ถามยืนยันก่อน
            Alert.alert(
                "Confirmation",
                `Are you sure to booking on  ${selectedDate} Time ${selectedTime}`,
                [
                    {
                        text: "cancel",
                        style: "cancel",
                    },
                    {
                        text: "confirm",
                        onPress: () => {
                            // ✅ เมื่อกดตกลง ค่อยเรียก addReservation
                            const addReservation = async () => {
                                try {
                                    const res = await axios.post(
                                        `${apiURL}/reservation`,
                                        {
                                            user_id: decoded.id,
                                            date: selectedDate,
                                            period: selectedTime,
                                            selected_services_id: selectedServices,
                                        },
                                        {
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                            },
                                        }
                                    );

                                    if (res.data.status === true) {
                                        Alert.alert(
                                            "✅ Reservation Successful",
                                            "Your appointment has been booked.\n\n📍 Please be on time.\n⏰ If you are more than 15 minutes late, your booking will be canceled.",
                                            [
                                                {
                                                    text: "OK",
                                                    onPress: () => {
                                                        setSelectedTime("");
                                                        router.back();
                                                        router.back();
                                                    },
                                                },
                                            ]
                                        );
                                        dispatch(resetServices());
                                    } else {
                                        Alert.alert("❌ Reservation Failed", res.data.message || "Please try again later.");
                                    }
                                    console.log(res.data);
                                } catch (err) {
                                    console.error("Error fetching chat:", err);
                                    Alert.alert("❌ Error", "An unexpected error occurred.");
                                }
                            };
                            addReservation();
                        },
                    },
                ]
            );
        } else {
            Alert.alert("กรุณาเลือกวันและเวลาให้ครบก่อนจอง");
        }
    };

    const todayInBangkok = new Date(
        new Date().getTime() + 7 * 60 * 60 * 1000
    )
        .toISOString()
        .split("T")[0];

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <View className="flex-1 pl-2" >
                <View className="flex-[1.5] justify-center bg-white" style={{marginHorizontal : -10}}>
                    <View className="flex-row justify-between px-5">
                        <Svg width={24} height={24} viewBox="0 0 24 24" onPress={() => { navigation.setOptions({ tabBarStyle: { display: "flex" } }); router.back();}}>
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
                        <Text className="text-text_default_color text-2xl font-bold">Select Date & Time</Text>
                        <View></View>
                    </View>
                </View>
                <View className="flex-[17]">
                    <View className="flex-[10]">
                        <CalendarList
                            minDate={todayInBangkok}
                            onDayPress={(day) => setSelectedDate(day.dateString)}
                            markedDates={{
                                [selectedDate]: {
                                    selected: true,
                                    selectedColor: "#dda15e",
                                },
                            }}
                            pastScrollRange={0}
                            futureScrollRange={4}
                            scrollEnabled={true}
                            showScrollIndicator={true}
                            theme={{
                                selectedDayBackgroundColor: "#C61CFB",
                                todayTextColor: "#C61CFB",
                                arrowColor: "#C61CFB",
                            }}
                        />
                    </View>
                    <View className="flex-1 justify-end">
                        <Text className="font-bold text-xl">Available Time</Text>
                    </View>

                    <View className="flex-1 flex-row">
                        <ScrollView     horizontal
                                        showsHorizontalScrollIndicator={false}>
                            {availableTime.map((time) => (
                                <TouchableOpacity
                                    key={time}
                                    onPress={() => setSelectedTime(time)}
                                    style={{
                                        paddingVertical: 10,
                                        paddingHorizontal: 15,
                                        borderRadius: 10,
                                        margin: 5,
                                        backgroundColor: selectedTime === time ? "#dda15e" : "#F2F2F2",
                                        alignItems : 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: selectedTime === time ? "#fff" : "#555",
                                            fontWeight: "600",
                                        }}
                                    >
                                        {time}
                                    </Text>
                                </TouchableOpacity>

                            ))}
                        </ScrollView>
                    </View>
                    <View className="flex-[2] justify-center">
                        <TouchableOpacity onPress={handleBookAppointmentButton} className="bg-[#dda15e] justify-center items-center py-5 rounded-xl ' : 'bg-secondary_color opacity-50 justify-center items-center py-5 rounded-xl">
                            <Text className="font-semibold text-xl text-gray-500">Book Appointment</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}