// screens/Main/HomeScreen.tsx

import * as React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button, Card, Text } from 'react-native-paper';
import { useAuth } from '@/providers/auth-provider';
import { useSnackbar } from '@/providers/snackbar-provider';

export default function HomeScreen(): React.JSX.Element {
  const { user } = useAuth();
  const { show } = useSnackbar();
  const [loading, setLoading] = React.useState(false);
  const [greeting, setGreeting] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        await new Promise((r) => setTimeout(r, 500));
        if (!mounted) return;
        setGreeting(`Welcome back, ${user?.first_name ?? user?.username ?? 'Guest'}!`);
      } catch {
        show('Failed to load home data', { variant: 'error' });
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [user, show]);

  return (
    <View className="bg-background_color flex-1 p-4">
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
          <Text className="text-text_default_color mt-2">Loading…</Text>
        </View>
      ) : (
        <>
          <Card>
            <Card.Content>
              <Text variant="titleMedium" className="text-text_heading_color">
                {greeting}
              </Text>
              <Text className="text-text_default_color mt-2">
                Start a new booking or browse our gallery.
              </Text>
            </Card.Content>
          </Card>

          <View className="mt-4 flex-row gap-3">
            <Button mode="contained" onPress={() => show('Go to Booking', { variant: 'info' })}>
              New Booking
            </Button>
            <Button mode="outlined" onPress={() => show('Open Gallery', { variant: 'info' })}>
              Gallery
            </Button>
          </View>
        </>
      )}
    </View>
  );
}
