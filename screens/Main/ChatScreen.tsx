// screens/Main/ChatScreen.tsx

import * as React from 'react';
import { View } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import { useSnackbar } from '@/providers/snackbar-provider';

export default function ChatScreen(): React.JSX.Element {
  const { show } = useSnackbar();
  const [msg, setMsg] = React.useState('');

  const send = () => {
    if (!msg.trim()) return;
    show('Sent (mock)', { variant: 'success' });
    setMsg('');
  };

  return (
    <View className="bg-background_color flex-1 p-4">
      <Card>
        <Card.Content>
          <Text className="text-text_default_color">
            Chat assistant coming soon. Ask about services, prices, or booking slots.
          </Text>
        </Card.Content>
      </Card>

      <View className="mt-4">
        <TextInput
          mode="outlined"
          value={msg}
          onChangeText={setMsg}
          placeholder="Type your message…"
          right={<TextInput.Icon icon="send" onPress={send} />}
        />
        <Button className="mt-3" mode="contained" onPress={send}>
          Send
        </Button>
      </View>
    </View>
  );
}
