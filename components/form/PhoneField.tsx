// // components/form/PhoneField.tsx

// import * as React from 'react';
// import { forwardRef } from 'react';
// import type { TextInput as RNTextInput } from 'react-native';
// import { InputField } from './fields';

// type Props = {
//   label?: string;
//   topLabel?: string;
//   placeholder?: string;
//   value: string;
//   onChangeText: (v: string) => void;
//   onBlur?: () => void;
//   errorMessage?: string;
//   returnKeyType?: 'done' | 'next' | 'go' | 'search' | 'send';
//   onSubmitEditing?: () => void;
//   testID?: string;
// };

// function normalizePhone(input: string): string {
//   return input.replace(/[^\d]/g, '').slice(0, 15);
// }

// export const PhoneField = forwardRef<RNTextInput, Props>(function PhoneField(
//   {
//     label = 'Phone',
//     topLabel,
//     placeholder = '0812345678',
//     value,
//     onChangeText,
//     onBlur,
//     errorMessage,
//     returnKeyType,
//     onSubmitEditing,
//     testID,
//   },
//   ref
// ) {
//   return (
//     <InputField
//       ref={ref}
//       label={label}
//       topLabel={topLabel}
//       placeholder={placeholder}
//       value={value}
//       onChangeText={(t) => onChangeText(normalizePhone(t))}
//       onBlur={onBlur}
//       errorMessage={errorMessage}
//       keyboardType="phone-pad"
//       inputMode="tel"
//       leftIcon="phone-outline"
//       returnKeyType={returnKeyType}
//       onSubmitEditing={onSubmitEditing}
//       testID={testID}
//     />
//   );
// });

import * as React from 'react';
import { forwardRef } from 'react';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { InputField } from './fields';

/** อนุมานชนิด instance ของ PaperTextInput เพื่อใช้กับ forwardRef */
type PaperRefInstance =
  NonNullable<React.ComponentProps<typeof PaperTextInput>['ref']> extends React.Ref<infer R>
    ? R
    : never;

type Props = {
  label?: string;
  topLabel?: string;
  placeholder?: string;
  value: string;
  onChangeText: (v: string) => void;
  onBlur?: () => void;
  errorMessage?: string;
  returnKeyType?: 'done' | 'next' | 'go' | 'search' | 'send';
  onSubmitEditing?: () => void;
  testID?: string;
};

function normalizePhone(input: string): string {
  return input.replace(/[^\d]/g, '').slice(0, 15);
}

export const PhoneField = forwardRef<PaperRefInstance, Props>(function PhoneField(
  {
    label = 'Phone',
    topLabel,
    placeholder = '0812345678',
    value,
    onChangeText,
    onBlur,
    errorMessage,
    returnKeyType,
    onSubmitEditing,
    testID,
  },
  ref
) {
  return (
    <InputField
      ref={ref}
      label={label}
      topLabel={topLabel}
      placeholder={placeholder}
      value={value}
      onChangeText={(t) => onChangeText(normalizePhone(t))}
      onBlur={onBlur}
      errorMessage={errorMessage}
      keyboardType="phone-pad"
      inputMode="tel"
      leftIcon="phone-outline"
      returnKeyType={returnKeyType}
      onSubmitEditing={onSubmitEditing}
      testID={testID}
    />
  );
});
