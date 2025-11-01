// // components/form/DataField.tsx

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

// function maskYYYYMMDD(raw: string): string {
//   const digits = raw.replace(/[^\d]/g, '').slice(0, 8);
//   const y = digits.slice(0, 4);
//   const m = digits.slice(4, 6);
//   const d = digits.slice(6, 8);
//   if (digits.length <= 4) return y;
//   if (digits.length <= 6) return `${y}-${m}`;
//   return `${y}-${m}-${d}`;
// }

// export const DateField = forwardRef<RNTextInput, Props>(function DateField(
//   {
//     label = 'YYYY-MM-DD',
//     topLabel,
//     placeholder = '1999-07-21',
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
//       onChangeText={(t) => onChangeText(maskYYYYMMDD(t))}
//       onBlur={onBlur}
//       errorMessage={errorMessage}
//       keyboardType="number-pad"
//       inputMode="numeric"
//       leftIcon="calendar-month-outline"
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

function maskYYYYMMDD(raw: string): string {
  const digits = raw.replace(/[^\d]/g, '').slice(0, 8);
  const y = digits.slice(0, 4);
  const m = digits.slice(4, 6);
  const d = digits.slice(6, 8);
  if (digits.length <= 4) return y;
  if (digits.length <= 6) return `${y}-${m}`;
  return `${y}-${m}-${d}`;
}

export const DateField = forwardRef<PaperRefInstance, Props>(function DateField(
  {
    label = 'YYYY-MM-DD',
    topLabel,
    placeholder = '1999-07-21',
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
      onChangeText={(t) => onChangeText(maskYYYYMMDD(t))}
      onBlur={onBlur}
      errorMessage={errorMessage}
      keyboardType="number-pad"
      inputMode="numeric"
      leftIcon="calendar-month-outline"
      returnKeyType={returnKeyType}
      onSubmitEditing={onSubmitEditing}
      testID={testID}
    />
  );
});
