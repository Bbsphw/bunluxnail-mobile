import {FlatList, Text, View, TouchableOpacity} from "react-native";
import * as React from 'react';
import { Avatar, Button, Card, Checkbox} from 'react-native-paper';
import '../global.css'
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect, useState} from "react";
import { Svg, G, Path, Defs, ClipPath, Rect } from "react-native-svg";
import { useNavigation, useRouter, router } from "expo-router";
import {useIsFocused} from "@react-navigation/native";
import { RootState } from "../../store";
import { incrementByServices, decrementByServices, decrementByServicesByZero } from "@/features/counterSlice";
import {useDispatch, useSelector} from "react-redux";

export default function Booking() {
    const navigation = useNavigation();
    const router = useRouter();
    const isFocused = useIsFocused();
    const totalServices = useSelector((state: RootState) => state.counter.totalServices);




    useEffect(() => {
        if (isFocused) {
            navigation.setOptions({ tabBarStyle: { display: "none" } });
            console.log("Booking focused");
        } else {
            navigation.setOptions({tabBarStyle: {display: "flex"}});
            console.log("Booking unfocused");
        }
    },[isFocused])

    const data = [
        {
            title : "Gel Nails",
            subtitle : "Gel polish application for a long-lasting, chip-resistant finish.",
            picture : "https://t4.ftcdn.net/jpg/02/18/18/55/360_F_218185587_P4zituDtWJOfClUKL6merI0BgLMIxoeC.jpg",
            price : 100
        },
        {
            title : "Nail Extensions",
            subtitle: "Enhance your natural nails with extensions for added length and strength.",
            picture : "https://t4.ftcdn.net/jpg/02/18/18/55/360_F_218185587_P4zituDtWJOfClUKL6merI0BgLMIxoeC.jpg",
            price : 100
        },
        {
            title : "Manicure",
            subtitle: "Classic nail care treatment including shaping, cuticle care, and polish.",
            picture : "https://t4.ftcdn.net/jpg/02/18/18/55/360_F_218185587_P4zituDtWJOfClUKL6merI0BgLMIxoeC.jpg",
            price : 20
        }
    ]

    const handleDisableNextButton = () => {
        if(totalServices > 0){
            router.push("/dateTimePicker")
            console.log("Push dateTimePicker");
        }
    }


    return (
        // <SafeAreaProvider style={{}}>
            <SafeAreaView className="flex-1 bg-white" edges={[]}>
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
                        <TouchableOpacity onPress={handleDisableNextButton} className={totalServices > 0 ? 'bg-secondary_color justify-center items-center py-5 rounded-xl ' : 'bg-secondary_color opacity-50 justify-center items-center py-5 rounded-xl'}>
                            <Text className="font-semibold text-xl text-gray-500">Next (Total Selected {totalServices})</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        // </SafeAreaProvider>

    )
}


const RenderServices = ({item} : {item : any}) =>{
    const [selected, setSelected] = useState(false);
    const dispatch = useDispatch();


    // console.log("RenderServices", item);

    const RightSide = (props : any, {item} : {item : any}) => {



        return (
            <View className="flex-row items-center mr-10">
                <Text className="text-secondary_color text-xl font-semibold">{item.price}฿</Text>
                {/*<Checkbox.Android status="checked" {...props} uncheckedColor="#4B352A" color="#4B352A" />*/}
            </View>
        )
    }

    return (
        // <TouchableOpacity>
            <Card style={{marginBottom: 15}}
                  mode={selected ? "outlined" : "elevated"}
                  theme={{ colors: {elevation : {level1 : '#FFFFFF'}, outline: '#FFFFFF', surface : '#F2F2F2'}}}
                  contentStyle={{marginVertical: 10}}
                  onPress={(() =>{
                      setSelected(!selected);
                      console.log("TAP")
                      if (!selected){
                          console.log("TAP If")
                          dispatch(incrementByServices())
                      }else{
                          console.log("TAP Else")
                          dispatch(decrementByServices())
                      }
                  })}
            >
                <Card.Title
                    className="space-x-5"
                    leftStyle={{ marginRight: 30 }}
                    title={item.title}
                    titleStyle={{fontWeight : 'bold'}}
                    subtitle={item.subtitle}
                    subtitleNumberOfLines={3}
                    left={(props) => (
                        <Avatar.Image
                            {...props}
                            size={50}
                            source={{ uri: item.picture }}
                            className="bg-transparent"
                            style={{borderRadius : 100}}
                        />
                    )}
                    // right={(props) => <Checkbox.IOS status="checked" {...props}  />}
                    right={(props) => RightSide(props, {item})}
                    subtitleStyle={{fontWeight : 'light'}}
                    rightStyle={{alignSelf : 'flex-start'}}
                />
            </Card>
        // {/*</TouchableOpacity>*/}
    )
}