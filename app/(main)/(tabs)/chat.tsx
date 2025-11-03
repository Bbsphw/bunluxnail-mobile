// app/(main)/(tabs)/chat.tsx

import * as React from 'react';
import ChatScreen from '@/screens/Main/ChatScreen';

export default function TabChat(): React.JSX.Element {
  return <ChatScreen />;
}
//
// import "./../../global.css";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import axios from "axios";
//
// import { useAuth } from '@/providers/auth-provider';
//
// export default function Chat() {
//   const apiURL = process.env.EXPO_PUBLIC_API_BASE_URL;
//   const [data, setData] = useState<any[]>([]);
//   const [message, setMessage] = useState("");
//   const [refreshTrigger, setRefreshTrigger] = useState(0);
//   const flatListRef = useRef<FlatList>(null);
//
//   useEffect(() => {
//     const fetchChat = async () => {
//       try {
//         const res = await axios.get(`${apiURL}/getChat`, {
//           params: { user_id: 7 },
//         });
//         setData(res.data);
//
//         setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
//       } catch (err) {
//         console.error("Error fetching chat:", err);
//       }
//     };
//     fetchChat();
//   }, [refreshTrigger]);
//
//   const handleSend = async () => {
//     if (!message.trim()) return;
//
//     const newMessage = {
//       id: Date.now(),
//       userid: 7,
//       sender: "user",
//       message,
//       timestamp: new Date().toISOString(),
//     };
//
//     setData((prev) => [...prev, newMessage]);
//     setMessage("");
//     setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
//
//     try {
//       await axios.post(`${apiURL}/chat`, {
//         user_message: message,
//         user_id: 7,
//       });
//       setRefreshTrigger((prev) => prev + 1);
//     } catch (err) {
//       console.error("Error sending chat:", err);
//     }
//   };
//
//   const renderItem = ({ item }: { item: any }) => (
//       <View
//           className={`w-full flex-row my-1 ${
//               item.sender === "user" ? "justify-end" : "justify-start"
//           }`}
//       >
//         <View
//             className={`max-w-[75%] px-3 py-2 rounded-2xl ${
//                 item.sender === "user"
//                     ? "bg-blue-500 rounded-br-none"
//                     : "bg-gray-300 rounded-bl-none"
//             }`}
//         >
//           <Text
//               className={`text-base ${
//                   item.sender === "user" ? "text-white" : "text-black"
//               }`}
//           >
//             {item.message}
//           </Text>
//         </View>
//       </View>
//   );
//
//   return (
//       <SafeAreaView className="flex-1 bg-white" edges={['top']}>
//         <KeyboardAvoidingView
//             style={{ flex: 1 }}
//             behavior={Platform.OS === "ios" ? "padding" : "height"}
//             keyboardVerticalOffset={90}
//         >
//           <FlatList
//               ref={flatListRef}
//               data={data}
//               renderItem={renderItem}
//               keyExtractor={(item) => item.id.toString()}
//               contentContainerStyle={{ padding: 12, flexGrow: 1, justifyContent: "flex-end" }}
//               onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
//           />
//
//           {/* Input Bar */}
//           <View className="flex-row items-center px-3 py-2 border-t border-gray-200 bg-white">
//             <TextInput
//                 className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2 text-base"
//                 placeholder="พิมพ์ข้อความ..."
//                 value={message}
//                 onChangeText={setMessage}
//                 multiline
//             />
//
//             <TouchableOpacity
//                 onPress={handleSend}
//                 className="bg-blue-500 rounded-full px-4 py-2"
//             >
//               <Text className="text-white font-medium">ส่ง</Text>
//             </TouchableOpacity>
//           </View>
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//   );
// }
