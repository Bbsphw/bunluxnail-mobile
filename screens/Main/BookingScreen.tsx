// screens/Main/BookingScreen.tsx

import * as React from 'react';
import { View, FlatList } from 'react-native';
import { ActivityIndicator, Button, Card, Text } from 'react-native-paper';
import { useSnackbar } from '@/providers/snackbar-provider';

type Service = { id: string; name: string; price: number; estMin: number };

export default function BookingScreen(): React.JSX.Element {
  const { show } = useSnackbar();
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState<Service[]>([]);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await new Promise((r) => setTimeout(r, 600));
        const mock: Service[] = [
          { id: 's1', name: 'Gel Polish', price: 450, estMin: 60 },
          { id: 's2', name: 'Nail Art', price: 650, estMin: 90 },
          { id: 's3', name: 'Spa Manicure', price: 550, estMin: 75 },
        ];
        if (mounted) setItems(mock);
      } catch {
        show('Failed to load services', { variant: 'error' });
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [show]);

  if (loading) {
    return (
      <View className="bg-background_color flex-1 items-center justify-center">
        <ActivityIndicator />
        <Text className="text-text_default_color mt-2">Loading services…</Text>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View className="bg-background_color flex-1 items-center justify-center p-6">
        <Text className="text-text_default_color">No services available.</Text>
        <Button className="mt-3" onPress={() => show('Refresh', { variant: 'info' })}>
          Refresh
        </Button>
      </View>
    );
  }

  return (
    <View className="bg-background_color flex-1 p-3">
      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        contentContainerStyle={{ gap: 12, paddingBottom: 16 }}
        renderItem={({ item }) => (
          <Card>
            <Card.Title title={item.name} subtitle={`~${item.estMin} min`} />
            <Card.Content>
              <Text className="text-text_heading_color">฿{item.price.toFixed(0)}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                onPress={() => show(`Select ${item.name}`, { variant: 'success' })}>
                Choose
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}
