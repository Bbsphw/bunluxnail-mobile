// screens/Auth/PersonalDetailScreen.tsx

import * as React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, Menu } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { InputField } from '@/components/form/fields';
import { PhoneField } from '@/components/form/PhoneField';
import { DateField } from '@/components/form/DataField';
import { useSnackbar } from '@/providers/snackbar-provider';
import { authApi } from '@/services/authApi';
import { useAuth } from '@/providers/auth-provider';
import type { Gender } from '@/types/user';

const OTP_PATH = '/(auth)/sign-up/otp' as const;
const GENDERS = ['male', 'female'] as const;

const PersonalDetailsSchema = z.object({
  first_name: z.string().min(2, 'First name required'),
  last_name: z.string().min(2, 'Last name required'),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format must be YYYY-MM-DD'),
  phone: z.string().min(9, 'Phone number invalid'),
  gender: z.enum(GENDERS, { message: 'Please select gender' }),
});
type PersonalDetailsForm = z.infer<typeof PersonalDetailsSchema>;

export default function PersonalDetails(): React.JSX.Element {
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string }>();
  const { show } = useSnackbar();
  const { user } = useAuth();

  const [genderMenu, setGenderMenu] = React.useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<PersonalDetailsForm>({
    resolver: zodResolver(PersonalDetailsSchema),
    defaultValues: { first_name: '', last_name: '', dob: '', phone: '', gender: 'male' },
    mode: 'onChange',
  });

  const onSubmit = async (data: PersonalDetailsForm) => {
    if (!user?.id) return show('Missing user id', { variant: 'error' });

    const res = await authApi.updateUser({
      id: user.id,
      first_name: data.first_name.trim(),
      last_name: data.last_name.trim(),
      phone: data.phone.trim(),
      gender: data.gender as Gender,
      role: 'user',
      // สามารถเพิ่ม birthday ถ้า backend รองรับ: birthday: data.dob
    });
    if (!res.ok) return show('Update failed', { variant: 'error' });

    const s = await authApi.sendOtp(params.email ?? '');
    if (!s.ok || !s.data.status) return show('Send OTP failed', { variant: 'error' });

    show('We sent you a code', { variant: 'success' });
    router.push({ pathname: OTP_PATH, params: { email: params.email ?? '' } });
  };

  return (
    <SafeAreaView className="bg-background_color flex-1">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
          <View className="bg-secondary_color/80 mx-4 mt-6 rounded-3xl p-5">
            <Text variant="headlineSmall" className="text-text_heading_color mb-4 font-bold">
              Personal Details
            </Text>

            <Controller
              control={control}
              name="first_name"
              render={({ field }) => (
                <InputField
                  label="First Name"
                  placeholder="John"
                  leftIcon="account-outline"
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  errorMessage={errors.first_name?.message}
                  returnKeyType="next"
                />
              )}
            />

            <Controller
              control={control}
              name="last_name"
              render={({ field }) => (
                <InputField
                  label="Last Name"
                  placeholder="Doe"
                  leftIcon="account-outline"
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  errorMessage={errors.last_name?.message}
                  returnKeyType="next"
                />
              )}
            />

            <Controller
              control={control}
              name="dob"
              render={({ field }) => (
                <DateField
                  label="YYYY-MM-DD"
                  placeholder="1999-07-21"
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  errorMessage={errors.dob?.message}
                  returnKeyType="next"
                />
              )}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <PhoneField
                  label="Phone"
                  placeholder="0812345678"
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  errorMessage={errors.phone?.message}
                  returnKeyType="next"
                />
              )}
            />

            {/* Gender */}
            <View className="mt-3">
              <Text className="text-text_default_color mb-1">Gender *</Text>
              <Menu
                visible={genderMenu}
                onDismiss={() => setGenderMenu(false)}
                anchor={
                  <Button
                    mode="outlined"
                    onPress={() => setGenderMenu(true)}
                    style={{ borderRadius: 999 }}
                    contentStyle={{ height: 48 }}
                    icon="chevron-down"
                    textColor="#5E503F">
                    {watch('gender') === 'male' ? 'Male' : 'Female'}
                  </Button>
                }>
                <Menu.Item
                  title="Male"
                  onPress={() => {
                    setValue('gender', 'male', { shouldValidate: true, shouldDirty: true });
                    setGenderMenu(false);
                  }}
                />
                <Menu.Item
                  title="Female"
                  onPress={() => {
                    setValue('gender', 'female', { shouldValidate: true, shouldDirty: true });
                    setGenderMenu(false);
                  }}
                />
              </Menu>
              {errors.gender && (
                <Text className="mt-1 text-xs text-red-600">{errors.gender.message}</Text>
              )}
            </View>

            <Button
              mode="contained"
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
              onPress={handleSubmit(onSubmit)}
              style={{ borderRadius: 999, marginTop: 20 }}
              contentStyle={{ height: 52 }}>
              NEXT
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
