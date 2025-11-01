// // src/app/(auth)/sign-up/personal-details.tsx

// import React from 'react';
// import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Button, Text, RadioButton, Menu, TextInput } from 'react-native-paper';
// import { Controller, useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useRouter } from 'expo-router';
// import { InputField } from '@/components/form/fields';

// // ใช้ tuple literal สำหรับ enum ที่ type-safe
// const GENDERS = ['male', 'female'] as const;
// type Gender = (typeof GENDERS)[number];

// // Zod schema
// const PersonalDetailsSchema = z.object({
//   first_name: z.string().min(2, 'First name required'),
//   last_name: z.string().min(2, 'Last name required'),
//   dob: z
//     .string()
//     .min(8, 'Date of Birth required')
//     .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format must be YYYY-MM-DD'),
//   phone: z
//     .string()
//     .min(9, 'Phone number invalid')
//     .regex(/^[0-9+\-() ]+$/, 'Phone format invalid'),
//   gender: z.enum(GENDERS, { message: 'Please select gender' }),
// });

// type PersonalDetailsForm = z.infer<typeof PersonalDetailsSchema>;

// export default function PersonalDetails() {
//   const router = useRouter();
//   const [genderMenu, setGenderMenu] = React.useState(false);

//   const {
//     control,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors, isValid, isSubmitting },
//   } = useForm<PersonalDetailsForm>({
//     resolver: zodResolver(PersonalDetailsSchema),
//     defaultValues: {
//       first_name: '',
//       last_name: '',
//       dob: '',
//       phone: '',
//       gender: 'male',
//     },
//     mode: 'onChange',
//   });

//   const onSubmit = async (data: PersonalDetailsForm) => {
//     // TODO: call backend เพื่อบันทึกข้อมูลส่วนตัวก่อนขอ OTP
//     router.push('/(auth)/sign-up/otp' as const);
//   };

//   // NOTE: ตัวอย่าง date input แบบง่าย (ถ้าอยากใช้ DateTimePicker ค่อยเชื่อมต่อใน onPress ไอคอนไปเปิด picker)
//   const dobRightIcon = (
//     <TextInput.Icon
//       icon="calendar"
//       onPress={() => {
//         // TODO: เปิด native date picker แล้ว setValue('dob', 'YYYY-MM-DD')
//       }}
//     />
//   );

//   return (
//     <SafeAreaView className="bg-background_color flex-1">
//       <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//         <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
//           <View className="bg-secondary_color/80 mx-4 mt-6 rounded-3xl p-5">
//             <Text variant="headlineSmall" className="text-text_heading_color mb-4 font-bold">
//               Personal Details
//             </Text>

//             {/* First Name */}
//             <Controller
//               control={control}
//               name="first_name"
//               render={({ field }) => (
//                 <InputField
//                   // topLabel="First Name *"
//                   label="First Name"
//                   placeholder="John"
//                   leftIcon="account-outline"
//                   value={field.value}
//                   onBlur={field.onBlur}
//                   onChangeText={field.onChange}
//                   errorMessage={errors.first_name?.message}
//                   returnKeyType="next"
//                 />
//               )}
//             />

//             {/* Last Name */}
//             <Controller
//               control={control}
//               name="last_name"
//               render={({ field }) => (
//                 <InputField
//                   // topLabel="Last Name *"
//                   label="Last Name"
//                   placeholder="Doe"
//                   leftIcon="account-outline"
//                   value={field.value}
//                   onBlur={field.onBlur}
//                   onChangeText={field.onChange}
//                   errorMessage={errors.last_name?.message}
//                   returnKeyType="next"
//                 />
//               )}
//             />

//             {/* Date of Birth */}
//             <Controller
//               control={control}
//               name="dob"
//               render={({ field }) => (
//                 <InputField
//                   // topLabel="Date of Birth *"
//                   label="YYYY-MM-DD"
//                   placeholder="1995-07-21"
//                   leftIcon="calendar-outline"
//                   value={field.value}
//                   onBlur={field.onBlur}
//                   onChangeText={field.onChange}
//                   errorMessage={errors.dob?.message}
//                   returnKeyType="next"
//                   // แทรกปุ่ม calendar ด้านขวา (ใช้ TextInput จาก Paper โดยตรงไม่ได้ผ่าน InputField)
//                 />
//               )}
//             />

//             {/* Phone */}
//             <Controller
//               control={control}
//               name="phone"
//               render={({ field }) => (
//                 <InputField
//                   // topLabel="Mobile Number *"
//                   label="Phone"
//                   placeholder="0812345678"
//                   leftIcon="phone-outline"
//                   value={field.value}
//                   onBlur={field.onBlur}
//                   onChangeText={field.onChange}
//                   keyboardType="phone-pad"
//                   errorMessage={errors.phone?.message}
//                   returnKeyType="next"
//                 />
//               )}
//             />

//             {/* Gender: ใช้ Paper Menu ให้เป็น select */}
//             <View className="mt-3">
//               <Text className="text-text_default_color mb-1">Gender *</Text>
//               <Menu
//                 visible={genderMenu}
//                 onDismiss={() => setGenderMenu(false)}
//                 anchor={
//                   <Button
//                     mode="outlined"
//                     onPress={() => setGenderMenu(true)}
//                     style={{ borderRadius: 999 }}
//                     contentStyle={{ height: 48 }}
//                     icon="chevron-down"
//                     textColor="#5E503F">
//                     {watch('gender') === 'male' ? 'Male' : 'Female'}
//                   </Button>
//                 }>
//                 <Menu.Item
//                   title="Male"
//                   onPress={() => {
//                     setValue('gender', 'male', { shouldValidate: true, shouldDirty: true });
//                     setGenderMenu(false);
//                   }}
//                 />
//                 <Menu.Item
//                   title="Female"
//                   onPress={() => {
//                     setValue('gender', 'female', { shouldValidate: true, shouldDirty: true });
//                     setGenderMenu(false);
//                   }}
//                 />
//               </Menu>
//               {errors.gender && (
//                 <Text className="mt-1 text-xs text-red-600">{errors.gender.message}</Text>
//               )}
//             </View>

//             <Button
//               mode="contained"
//               disabled={!isValid || isSubmitting}
//               loading={isSubmitting}
//               onPress={handleSubmit(onSubmit)}
//               style={{ borderRadius: 999, marginTop: 20 }}
//               contentStyle={{ height: 52 }}>
//               NEXT
//             </Button>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// app/(auth)/sign-up/personal-details.tsx

import * as React from 'react';
import PersonalDetailScreen from '@/screens/Auth/PersonalDetailScreen';

export default function PersonalDetailsRoute(): React.JSX.Element {
  return <PersonalDetailScreen />;
}
