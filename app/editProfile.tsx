


import {View, Text} from 'react-native';
import { useLocalSearchParams } from "expo-router";

export default function EditProfile () {
    const { id, first_name, last_name, email, phone, gender, picture_base64, username } = useLocalSearchParams();
    return (
        <View className="flex-1">
            <Text>Edit Profile</Text>
        </View>
    );
}