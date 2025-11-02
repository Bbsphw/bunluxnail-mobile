// // app/editProfile.tsx

// import { View, Text } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';

// export default function EditProfile() {
//   const { id, first_name, last_name, email, phone, gender, picture_base64, username } =
//     useLocalSearchParams();

//   return (
//     <View className="flex-1">
//       <Text>Edit Profile</Text>
//     </View>
//   );
// }

// app/editProfile.tsx
import * as React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, IconButton, Text, TextInput as PaperTextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { InputField } from '@/components/form/fields';
import AvatarPicker, { AvatarFile } from '@/components/profile/AvatarPicker';
import GenderSelect from '@/components/profile/GenderSelect';

import { useSnackbar } from '@/providers/snackbar-provider';
import { useAuth } from '@/providers/auth-provider';
import { authApi } from '@/services/authApi';
import type { Gender, PersonalDetailsDto } from '@/types/user';

const Schema = z.object({
  first_name: z.string().min(2, 'Required'),
  last_name: z.string().min(2, 'Required'),
  phone: z.string().min(6, 'Invalid phone'),
  gender: z.enum(['male', 'female']),
});
type FormData = z.infer<typeof Schema>;

type EditParams = {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  gender?: string;
  username?: string;
  picture_base64?: string;
};

export default function EditProfile(): React.JSX.Element {
  const router = useRouter();
  const { show } = useSnackbar();
  const { user, refreshProfile } = useAuth();

  const params = useLocalSearchParams<EditParams>();
  const readOnlyEmail = params.email ?? user?.email ?? '';
  const readOnlyUsername = params.username ?? user?.username ?? '';

  const [avatar, setAvatar] = React.useState<AvatarFile | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    mode: 'onChange',
    defaultValues: {
      first_name: params.first_name ?? user?.first_name ?? '',
      last_name: params.last_name ?? user?.last_name ?? '',
      phone: params.phone ?? user?.phone ?? '',
      gender: ((params.gender ?? user?.gender) as Gender) || 'male',
    },
  });

  const onSubmit = async (data: FormData) => {
    const idFromParam = params.id ? Number(params.id) : undefined;
    const uid = user?.id ?? idFromParam;
    if (!uid || Number.isNaN(uid)) return show('Missing user id', { variant: 'error' });

    const payload: PersonalDetailsDto & { picture?: AvatarFile } = {
      id: uid,
      first_name: data.first_name.trim(),
      last_name: data.last_name.trim(),
      phone: data.phone.trim(),
      gender: data.gender as Gender,
      role: (user?.role ?? 'user') as PersonalDetailsDto['role'],
      ...(avatar ? { picture: avatar } : {}),
    };

    const res = await authApi.updateUser(payload);
    if (!res.ok) return show(res.error.message ?? 'Update failed', { variant: 'error' });

    // อัปเดต context ให้เป็นข้อมูลล่าสุดจาก backend
    await refreshProfile();

    // ค่าที่ส่งกลับหน้าโปรไฟล์ (รูป: ให้ priority กับรูปใหม่ file:// ถ้าเลือกภาพ)
    const pictureForProfile =
      avatar?.uri ??
      (typeof params.picture_base64 === 'string' ? params.picture_base64 : undefined) ??
      user?.picture_base64 ??
      '';

    // ส่งพารามิเตอร์ “ล่าสุด” กลับไปหน้าโปรไฟล์ เพื่อสะท้อน UI ทันที
    router.replace({
      pathname: '/(main)/(tabs)/profile',
      params: {
        id: String(uid),
        first_name: data.first_name.trim(),
        last_name: data.last_name.trim(),
        email: readOnlyEmail,
        picture_base64: pictureForProfile,
      },
    });

    show('Profile updated 🎉', { variant: 'success' });
  };

  return (
    <SafeAreaView className="bg-background_color flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-2 pt-1">
          <IconButton icon="chevron-left" onPress={() => router.back()} />
          <Text variant="titleLarge" className="text-text_heading_color">
            Edit Profile
          </Text>
          <IconButton
            icon="check"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || isSubmitting}
          />
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 40 }} className="px-6">
          {/* Avatar */}
          <View className="mt-2">
            <AvatarPicker
              uri={params.picture_base64 ?? user?.picture_base64 ?? undefined}
              onChange={setAvatar}
            />
          </View>

          {/* Read-only account section */}
          <View className="mt-8">
            <Text className="text-text_heading_color mb-4 font-semibold">Account</Text>

            <PaperTextInput
              mode="outlined"
              label="E-mail address"
              value={readOnlyEmail}
              disabled
              left={<PaperTextInput.Icon icon="email-outline" />}
              style={{ borderRadius: 999 }}
              outlineStyle={{ borderRadius: 999, borderWidth: 1.5 }}
              outlineColor="#E6DAD2"
              activeOutlineColor="#E6DAD2"
            />

            <View className="mt-3" />
            <PaperTextInput
              mode="outlined"
              label="User name"
              value={readOnlyUsername}
              disabled
              left={<PaperTextInput.Icon icon="account-outline" />}
              style={{ borderRadius: 999 }}
              outlineStyle={{ borderRadius: 999, borderWidth: 1.5 }}
              outlineColor="#E6DAD2"
              activeOutlineColor="#E6DAD2"
            />

            <View className="mt-3" />
            <PaperTextInput
              mode="outlined"
              label="Password"
              value="••••••••"
              secureTextEntry
              disabled
              left={<PaperTextInput.Icon icon="lock-outline" />}
              right={<PaperTextInput.Icon icon="eye-off-outline" disabled />}
              style={{ borderRadius: 999 }}
              outlineStyle={{ borderRadius: 999, borderWidth: 1.5 }}
              outlineColor="#E6DAD2"
              activeOutlineColor="#E6DAD2"
            />

            <Text className="text-onSurfaceVariant mt-4 text-xs">
              Email, username และ password ถูกกำหนดตอนสมัคร ไม่สามารถแก้ไขได้
            </Text>
          </View>

          {/* Editable personal section */}
          <View className="mt-8">
            <Text className="text-text_heading_color mb-2 font-semibold">Personal info</Text>

            <Controller
              control={control}
              name="first_name"
              render={({ field }) => (
                <InputField
                  topLabel="First name"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  errorMessage={errors.first_name?.message}
                  leftIcon="account-outline"
                  returnKeyType="next"
                />
              )}
            />

            <Controller
              control={control}
              name="last_name"
              render={({ field }) => (
                <InputField
                  topLabel="Last name"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  errorMessage={errors.last_name?.message}
                  leftIcon="account-outline"
                  returnKeyType="next"
                />
              )}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <InputField
                  topLabel="Phone number"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  keyboardType="phone-pad"
                  inputMode="tel"
                  errorMessage={errors.phone?.message}
                  leftIcon="phone-outline"
                  returnKeyType="next"
                />
              )}
            />

            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <GenderSelect
                  testID="gender-select"
                  value={field.value as Gender}
                  onChange={(g) => setValue('gender', g, { shouldValidate: true })}
                  errorMessage={errors.gender?.message}
                />
              )}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
