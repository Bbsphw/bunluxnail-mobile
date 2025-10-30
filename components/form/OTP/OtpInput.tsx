// components/form/OTP/OtpInput.tsx

import * as React from 'react';
import { useRef } from 'react';
import { View, TextInput as RNTextInput, StyleSheet } from 'react-native';

type Props = {
  length?: number; // default 4
  value: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
  testID?: string;
};

export default function OtpInput({
  length = 4,
  value,
  onChange,
  disabled = false,
  testID,
}: Props): React.JSX.Element {
  const inputs = useRef<Array<RNTextInput | null>>([]);

  const handleChange = (txt: string, idx: number) => {
    if (disabled) return;
    const next = [...value];
    next[idx] = txt.replace(/[^\d]/g, '').slice(-1);
    onChange(next);
    if (txt && idx < length - 1) inputs.current[idx + 1]?.focus();
  };

  const handleKeyPress = (key: string, idx: number) => {
    if (key === 'Backspace' && !value[idx] && idx > 0) inputs.current[idx - 1]?.focus();
  };

  return (
    <View style={styles.row} testID={testID}>
      {Array.from({ length }).map((_, idx) => (
        <RNTextInput
          key={idx}
          ref={(el) => (inputs.current[idx] = el)}
          value={value[idx] ?? ''}
          onChangeText={(t) => handleChange(t, idx)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, idx)}
          keyboardType="number-pad"
          maxLength={1}
          editable={!disabled}
          style={styles.box}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'center' },
  box: {
    width: 52,
    height: 52,
    marginHorizontal: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D6C0B3',
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 18,
    color: '#5E503F',
  },
});
