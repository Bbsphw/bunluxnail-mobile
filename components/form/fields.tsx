// import React, { memo } from 'react';
// import { TextInput, HelperText } from 'react-native-paper';

// type BaseProps = {
//   label: string;
//   placeholder?: string;
//   value: string;
//   onChangeText: (t: string) => void;
//   onBlur?: () => void;
//   errorMessage?: string;
//   autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
//   keyboardType?:
//     | 'default'
//     | 'email-address'
//     | 'numeric'
//     | 'phone-pad'
//     | 'number-pad'
//     | 'url'
//     | 'visible-password';
//   leftIcon?: string;
//   returnKeyType?: 'done' | 'next' | 'go' | 'search' | 'send';
//   onSubmitEditing?: () => void;
//   testID?: string;
// };

// const _InputField = ({
//   label,
//   placeholder,
//   value,
//   onChangeText,
//   onBlur,
//   errorMessage,
//   autoCapitalize = 'none',
//   keyboardType = 'default',
//   leftIcon,
//   returnKeyType,
//   onSubmitEditing,
//   testID,
// }: BaseProps) => (
//   <>
//     <TextInput
//       testID={testID}
//       label={label}
//       mode="outlined"
//       value={value}
//       onBlur={onBlur}
//       onChangeText={onChangeText}
//       autoCapitalize={autoCapitalize}
//       keyboardType={keyboardType}
//       placeholder={placeholder}
//       left={leftIcon ? <TextInput.Icon icon={leftIcon} /> : undefined}
//       returnKeyType={returnKeyType}
//       onSubmitEditing={onSubmitEditing}
//       style={{ borderRadius: 999, marginTop: 12 }}
//       outlineStyle={{ borderRadius: 999, borderWidth: 1.5 }}
//     />
//     <HelperText type="error" visible={!!errorMessage}>
//       {errorMessage}
//     </HelperText>
//   </>
// );

// export const InputField = memo(_InputField);

// type PasswordProps = Omit<BaseProps, 'keyboardType' | 'autoCapitalize' | 'leftIcon'> & {
//   confirm?: boolean;
// };

// const _PasswordField = ({
//   label,
//   placeholder = '••••••••',
//   value,
//   onChangeText,
//   onBlur,
//   errorMessage,
//   returnKeyType,
//   onSubmitEditing,
//   confirm,
//   testID,
// }: PasswordProps) => {
//   const [show, setShow] = React.useState(false);
//   return (
//     <>
//       <TextInput
//         testID={testID}
//         label={label}
//         mode="outlined"
//         value={value}
//         onBlur={onBlur}
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//         secureTextEntry={!show}
//         left={<TextInput.Icon icon={confirm ? 'lock-check-outline' : 'lock-outline'} />}
//         right={
//           <TextInput.Icon icon={show ? 'eye-off' : 'eye'} onPress={() => setShow((s) => !s)} />
//         }
//         returnKeyType={returnKeyType}
//         onSubmitEditing={onSubmitEditing}
//         style={{ borderRadius: 999, marginTop: 12 }}
//         outlineStyle={{ borderRadius: 999, borderWidth: 1.5 }}
//       />
//       <HelperText type="error" visible={!!errorMessage}>
//         {errorMessage}
//       </HelperText>
//     </>
//   );
// };

// export const PasswordField = memo(_PasswordField);

// components/form/fields.tsx

import React, { memo } from 'react';
import { TextInput, HelperText } from 'react-native-paper';
import { Text, View } from 'react-native';

type BaseProps = {
  label?: string;
  topLabel?: string;
  placeholder?: string;
  value: string;
  onChangeText: (t: string) => void;
  onBlur?: () => void;
  errorMessage?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'url'
    | 'visible-password';
  returnKeyType?: 'done' | 'next' | 'go' | 'search' | 'send';
  onSubmitEditing?: () => void;
  leftIcon?: string;
  rightIcon?: string;
  dense?: boolean;
  topLabelClassName?: string;
  outlineColor?: string;
  activeOutlineColor?: string;
  textColor?: string;
  placeholderTextColor?: string;
  iconColor?: string;
  testID?: string;
};

const _InputField = ({
  label,
  topLabel,
  placeholder,
  value,
  onChangeText,
  onBlur,
  errorMessage,
  autoCapitalize = 'none',
  keyboardType = 'default',
  returnKeyType,
  onSubmitEditing,
  leftIcon,
  rightIcon,
  dense = false,
  topLabelClassName = 'mb-1 text-text_default_color',
  outlineColor = '#D6C0B3',
  activeOutlineColor = '#4B352A',
  textColor = '#5E503F',
  placeholderTextColor,
  iconColor = '#5E503F',
  testID,
}: BaseProps) => (
  <View className="mt-3">
    {topLabel ? <Text className={topLabelClassName}>{topLabel}</Text> : null}
    <TextInput
      testID={testID}
      mode="outlined"
      label={label}
      dense={dense}
      value={value}
      onBlur={onBlur}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      placeholder={placeholder}
      left={leftIcon ? <TextInput.Icon icon={leftIcon} color={iconColor} /> : undefined}
      right={rightIcon ? <TextInput.Icon icon={rightIcon} color={iconColor} /> : undefined}
      returnKeyType={returnKeyType}
      onSubmitEditing={onSubmitEditing}
      style={{ borderRadius: 999 }}
      outlineStyle={{ borderRadius: 999, borderWidth: 1.5 }}
      outlineColor={outlineColor}
      activeOutlineColor={activeOutlineColor}
      textColor={textColor}
      placeholderTextColor={placeholderTextColor}
    />
    <HelperText type="error" visible={!!errorMessage}>
      {errorMessage}
    </HelperText>
  </View>
);

export const InputField = memo(_InputField);

type PasswordProps = Omit<BaseProps, 'keyboardType' | 'leftIcon' | 'rightIcon'> & {
  confirm?: boolean;
};

const _PasswordField = ({
  label,
  topLabel,
  placeholder = '••••••••',
  value,
  onChangeText,
  onBlur,
  errorMessage,
  returnKeyType,
  onSubmitEditing,
  dense = false,
  topLabelClassName = 'mb-1 text-text_default_color',
  outlineColor = '#D6C0B3',
  activeOutlineColor = '#4B352A',
  textColor = '#5E503F',
  placeholderTextColor,
  iconColor = '#5E503F',
  confirm,
  testID,
}: PasswordProps) => {
  const [show, setShow] = React.useState(false);
  return (
    <View className="mt-3">
      {topLabel ? <Text className={topLabelClassName}>{topLabel}</Text> : null}
      <TextInput
        testID={testID}
        mode="outlined"
        label={label}
        dense={dense}
        value={value}
        onBlur={onBlur}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={!show}
        left={
          <TextInput.Icon
            icon={confirm ? 'lock-check-outline' : 'lock-outline'}
            color={iconColor}
          />
        }
        right={
          <TextInput.Icon
            icon={show ? 'eye-off' : 'eye'}
            onPress={() => setShow((s) => !s)}
            color={iconColor}
          />
        }
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        style={{ borderRadius: 999 }}
        outlineStyle={{ borderRadius: 999, borderWidth: 1.5 }}
        outlineColor={outlineColor}
        activeOutlineColor={activeOutlineColor}
        textColor={textColor}
        placeholderTextColor={placeholderTextColor}
      />
      <HelperText type="error" visible={!!errorMessage}>
        {errorMessage}
      </HelperText>
    </View>
  );
};

export const PasswordField = memo(_PasswordField);
