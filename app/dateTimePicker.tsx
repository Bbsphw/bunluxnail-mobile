import {View, Text, TouchableOpacity, FlatList} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import { Svg, G, Path, Defs, ClipPath, Rect } from "react-native-svg";
import React, { useState } from "react";
import { Calendar, CalendarList } from "react-native-calendars";
import { useNavigation, useRouter, router } from "expo-router";
import {useIsFocused} from "@react-navigation/native";
export default function DateTimePicker(){
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    
    const availableTime = ['12:00', '14:00', '16:00', '18:00']


    const navigation = useNavigation();
    const router = useRouter();
    const isFocused = useIsFocused();

    const handleBookAppointmentButton = () =>{
        if(selectedDate != '' && selectedTime != ''){

        }
    }

    return (
        <SafeAreaView className="flex-1 bg-white" edges={[]}>
            <View className="flex-1 px-5" >
                <View className="flex-[1.5] justify-center bg-white shadow-md" style={{marginHorizontal : -20}}>
                    <View className="flex-row justify-between px-5">
                        <Svg width={24} height={24} viewBox="0 0 24 24" onPress={() => { navigation.setOptions({ tabBarStyle: { display: "flex" } }); router.push('/booking');}}>
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
                            onDayPress={(day) => setSelectedDate(day.dateString)}
                            markedDates={{
                                [selectedDate]: {
                                    selected: true,
                                    selectedColor: "#C61CFB",
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

                        {availableTime.map((time) => (
                            <TouchableOpacity
                                key={time}
                                onPress={() => setSelectedTime(time)}
                                style={{
                                    paddingVertical: 10,
                                    paddingHorizontal: 15,
                                    borderRadius: 10,
                                    margin: 5,
                                    backgroundColor: selectedTime === time ? "#C61CFB" : "#F2F2F2",
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
                    </View>
                    <View className="flex-[2] justify-center">
                        <TouchableOpacity onPress={handleBookAppointmentButton} className="bg-secondary_color justify-center items-center py-5 rounded-xl ' : 'bg-secondary_color opacity-50 justify-center items-center py-5 rounded-xl">
                            <Text className="font-semibold text-xl text-gray-500">Book Appointment)</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}