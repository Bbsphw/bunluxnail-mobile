// // components/profile/BookingHistoryDialog.tsx

// import * as React from 'react';
// import { View, FlatList } from 'react-native';
// import {
//   Portal,
//   Dialog,
//   Text,
//   Button,
//   Chip,
//   IconButton,
//   ActivityIndicator,
//   useTheme,
// } from 'react-native-paper';
// import { reservationApi, type BookingItem } from '@/services/reservationApi';
// import { useSnackbar } from '@/providers/snackbar-provider';
// import { useAuth } from '@/providers/auth-provider';

// type Props = {
//   visible: boolean;
//   onClose: () => void;
// };

// function formatDateThai(d: string): string {
//   try {
//     const [y, m, day] = d.split('-').map(Number);
//     const date = new Date(y, m - 1, day);
//     return date.toLocaleDateString('th-TH', {
//       weekday: 'short',
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//     });
//   } catch {
//     return d;
//   }
// }
// const hhmm = (t: string): string => t.slice(0, 5);

// function StatusChip({ status }: { status: BookingItem['status'] }) {
//   const theme = useTheme();
//   const map: Record<string, { label: string; color: string }> = {
//     confirmed: { label: 'Confirmed', color: theme.colors.primary },
//     done: { label: 'Done', color: '#22c55e' },
//     cancel: { label: 'Canceled', color: '#ef4444' },
//   };
//   const cfg = map[status] ?? { label: status, color: theme.colors.outline };
//   return (
//     <Chip
//       compact
//       style={{ backgroundColor: `${cfg.color}20` }}
//       textStyle={{ color: cfg.color, fontWeight: '600' }}>
//       {cfg.label}
//     </Chip>
//   );
// }

// export default function BookingHistoryDialog({ visible, onClose }: Props) {
//   const { token } = useAuth();
//   const { show } = useSnackbar();
//   const [loading, setLoading] = React.useState(false);
//   const [items, setItems] = React.useState<BookingItem[]>([]);
//   const [cancelingId, setCancelingId] = React.useState<number | null>(null);

//   const fetchHistory = React.useCallback(async () => {
//     if (!token) return;
//     setLoading(true);
//     try {
//       const res = await reservationApi.getHistory(token);
//       if (res.status) {
//         setItems(res.data);
//       } else {
//         setItems([]);
//         show('No booking history found', { variant: 'info' });
//       }
//     } catch {
//       show('Failed to load booking history', { variant: 'error' });
//     } finally {
//       setLoading(false);
//     }
//   }, [token, show]);

//   React.useEffect(() => {
//     if (visible) fetchHistory();
//   }, [visible, fetchHistory]);

//   const onCancel = async (booking_id: number) => {
//     if (!token) return;
//     try {
//       setCancelingId(booking_id);
//       const res = await reservationApi.cancelBooking(token, booking_id);
//       if (res.status) {
//         show('Booking canceled successfully!', { variant: 'success' });
//         await fetchHistory();
//       } else {
//         show(res.message || 'Cancel failed', { variant: 'error' });
//       }
//     } catch {
//       show('Cancel booking failed', { variant: 'error' });
//     } finally {
//       setCancelingId(null);
//     }
//   };

//   return (
//     <Portal>
//       <Dialog
//         visible={visible}
//         onDismiss={onClose}
//         style={{ backgroundColor: 'white', borderRadius: 16 }}>
//         <Dialog.Title>Booking History</Dialog.Title>
//         <Dialog.Content>
//           {loading ? (
//             <View className="items-center py-6">
//               <ActivityIndicator />
//               <Text className="text-onSurfaceVariant mt-2">Loading…</Text>
//             </View>
//           ) : items.length === 0 ? (
//             <View className="py-4">
//               <Text className="text-onSurfaceVariant">No booking history found</Text>
//             </View>
//           ) : (
//             <FlatList
//               data={items}
//               keyExtractor={(it) => String(it.booking_id)}
//               contentContainerStyle={{ paddingBottom: 12 }}
//               style={{ maxHeight: 420 }}
//               ItemSeparatorComponent={() => <View className="h-[10px]" />}
//               renderItem={({ item }) => (
//                 <View className="rounded-xl border border-[#EDE5E0] p-3">
//                   <View className="mb-2 flex-row items-center justify-between">
//                     <Text className="text-text_heading_color text-base font-semibold">
//                       #{item.booking_id}
//                     </Text>
//                     <StatusChip status={item.status} />
//                   </View>

//                   <Text className="text-onSurfaceVariant text-[14px]">
//                     {formatDateThai(item.date)} · {hhmm(item.start_time)}–{hhmm(item.end_time)}
//                   </Text>

//                   <View className="mt-2 flex-row flex-wrap gap-2">
//                     <Chip compact icon="hand-heart" mode="outlined">
//                       {item.service_ids.length} service(s)
//                     </Chip>
//                   </View>

//                   <View className="mt-3 flex-row justify-end gap-2">
//                     <IconButton
//                       icon="refresh"
//                       size={18}
//                       onPress={fetchHistory}
//                       accessibilityLabel="Refresh"
//                     />
//                     <Button
//                       mode="outlined"
//                       compact
//                       disabled={item.status !== 'confirmed' || cancelingId === item.booking_id}
//                       loading={cancelingId === item.booking_id}
//                       onPress={() => onCancel(item.booking_id)}>
//                       Cancel booking
//                     </Button>
//                   </View>
//                 </View>
//               )}
//             />
//           )}
//         </Dialog.Content>
//         <Dialog.Actions>
//           <Button onPress={onClose}>Close</Button>
//         </Dialog.Actions>
//       </Dialog>
//     </Portal>
//   );
// }

// components/profile/BookingHistoryDialog.tsx

import * as React from 'react';
import { View, FlatList, RefreshControl, useWindowDimensions } from 'react-native';
import {
  Portal,
  Dialog,
  Text,
  Button,
  Chip,
  IconButton,
  ActivityIndicator,
  useTheme,
  Divider,
} from 'react-native-paper';
import { reservationApi, type BookingItem } from '@/services/reservationApi';
import { useSnackbar } from '@/providers/snackbar-provider';
import { useAuth } from '@/providers/auth-provider';
import { formatTHB } from '@/lib/format';

type Props = {
  visible: boolean;
  onClose: () => void;
};

function formatDateThai(d: string): string {
  try {
    const [y, m, day] = d.split('-').map(Number);
    const date = new Date(y, m - 1, day);
    return date.toLocaleDateString('th-TH', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return d;
  }
}

const hhmm = (t: string): string => t.slice(0, 5);

function StatusChip({ status }: { status: BookingItem['status'] }) {
  const theme = useTheme();
  const map: Record<string, { label: string; color: string; bg: string }> = {
    confirmed: { label: 'Confirmed', color: theme.colors.primary, bg: `${theme.colors.primary}20` },
    done: { label: 'Done', color: '#22c55e', bg: '#22c55e20' },
    cancel: { label: 'Canceled', color: '#ef4444', bg: '#ef444420' },
  };
  const cfg = map[status] ?? {
    label: status,
    color: theme.colors.outline,
    bg: `${theme.colors.outline}20`,
  };

  return (
    <Chip
      compact
      style={{ backgroundColor: cfg.bg }}
      textStyle={{ color: cfg.color, fontWeight: '600' }}>
      {cfg.label}
    </Chip>
  );
}

export default function BookingHistoryDialog({ visible, onClose }: Props) {
  const { height: winH } = useWindowDimensions();
  const maxListHeight = Math.min(560, Math.round(winH * 0.7));

  const { token } = useAuth();
  const { show } = useSnackbar();

  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [items, setItems] = React.useState<BookingItem[]>([]);
  const [cancelingId, setCancelingId] = React.useState<number | null>(null);

  const fetchHistory = React.useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await reservationApi.getHistory(token);
      if (res.status) {
        setItems(res.data);
      } else {
        setItems([]);
        show('No booking history found', { variant: 'info' });
      }
    } catch {
      show('Failed to load booking history', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [token, show]);

  const onRefresh = React.useCallback(async () => {
    if (!token) return;
    setRefreshing(true);
    try {
      const res = await reservationApi.getHistory(token);
      if (res.status) {
        setItems(res.data);
      } else {
        setItems([]);
      }
    } catch {
      show('Refresh failed', { variant: 'error' });
    } finally {
      setRefreshing(false);
    }
  }, [token, show]);

  React.useEffect(() => {
    if (visible) fetchHistory();
  }, [visible, fetchHistory]);

  const onCancel = async (booking_id: number) => {
    if (!token) return;
    try {
      setCancelingId(booking_id);
      const res = await reservationApi.cancelBooking(token, booking_id);
      if (res.status) {
        show('Booking canceled successfully!', { variant: 'success' });
        await fetchHistory();
      } else {
        show(res.message || 'Cancel failed', { variant: 'error' });
      }
    } catch {
      show('Cancel booking failed', { variant: 'error' });
    } finally {
      setCancelingId(null);
    }
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onClose}
        style={{ backgroundColor: 'white', borderRadius: 16 }}>
        <Dialog.Title>Booking History</Dialog.Title>

        {/* ทำ scroll ภายใน dialog เพื่อเลี่ยง overflow จอเล็ก */}
        <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
          {loading ? (
            <View className="items-center px-6 py-6">
              <ActivityIndicator />
              <Text className="text-onSurfaceVariant mt-2">Loading…</Text>
            </View>
          ) : items.length === 0 ? (
            <View className="px-6 py-6">
              <Text className="text-onSurfaceVariant">No booking history found</Text>
            </View>
          ) : (
            <FlatList
              data={items}
              keyExtractor={(it) => String(it.booking_id)}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 12 }}
              style={{ maxHeight: maxListHeight }}
              ItemSeparatorComponent={() => <View className="h-[10px]" />}
              renderItem={({ item }) => (
                <View className="p-12px rounded-xl border border-[#EDE5E0] bg-white shadow-sm">
                  {/* Row 1: ID + สถานะ + ราคา */}
                  <View className="mb-2 flex-row items-center justify-between">
                    <Text className="text-text_heading_color text-base font-semibold">
                      #{item.booking_id}
                    </Text>
                    <View className="flex-row items-center gap-2">
                      <Chip
                        compact
                        icon="currency-btc"
                        mode="flat"
                        style={{ backgroundColor: '#F6F0EC' }}>
                        <Text className="font-semibold">{formatTHB(item.total_price)}</Text>
                      </Chip>
                      <StatusChip status={item.status} />
                    </View>
                  </View>

                  {/* Row 2: วัน-เวลา */}
                  <Text className="text-onSurfaceVariant text-[14px]">
                    {formatDateThai(item.date)} · {hhmm(item.start_time)}–{hhmm(item.end_time)}
                  </Text>

                  {/* Row 3: chips service count */}
                  <View className="mt-8px flex-row flex-wrap gap-2">
                    <Chip compact icon="hand-heart" mode="outlined">
                      {item.service_ids.length} service(s)
                    </Chip>
                  </View>

                  <Divider style={{ marginTop: 12, opacity: 0.08 }} />

                  {/* Row 4: actions */}
                  <View className="mt-2 flex-row justify-end gap-2">
                    <IconButton
                      icon="refresh"
                      size={18}
                      onPress={onRefresh}
                      accessibilityLabel="Refresh"
                    />
                    <Button
                      mode="outlined"
                      compact
                      onPress={() => onCancel(item.booking_id)}
                      disabled={item.status !== 'confirmed' || cancelingId === item.booking_id}
                      loading={cancelingId === item.booking_id}
                      contentStyle={{ height: 40 }}
                      style={{ borderRadius: 10 }}>
                      Cancel booking
                    </Button>
                  </View>
                </View>
              )}
            />
          )}
        </Dialog.ScrollArea>

        <Dialog.Actions style={{ paddingHorizontal: 12 }}>
          <Button onPress={onClose} contentStyle={{ height: 44 }} style={{ borderRadius: 10 }}>
            Close
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
