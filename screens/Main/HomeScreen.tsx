// // screens/Main/HomeScreen.tsx

// import * as React from 'react';
// import { View } from 'react-native';
// import { ActivityIndicator, Button, Card, Text } from 'react-native-paper';
// import { useAuth } from '@/providers/auth-provider';
// import { useSnackbar } from '@/providers/snackbar-provider';

// export default function HomeScreen(): React.JSX.Element {
//   const { user } = useAuth();
//   const { show } = useSnackbar();
//   const [loading, setLoading] = React.useState(false);
//   const [greeting, setGreeting] = React.useState<string | null>(null);

//   React.useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         setLoading(true);
//         await new Promise((r) => setTimeout(r, 500));
//         if (!mounted) return;
//         setGreeting(`Welcome back, ${user?.first_name ?? user?.username ?? 'Guest'}!`);
//       } catch {
//         show('Failed to load home data', { variant: 'error' });
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     })();
//     return () => {
//       mounted = false;
//     };
//   }, [user, show]);

//   return (
//     <View className="bg-background_color flex-1 p-4">
//       {loading ? (
//         <View className="flex-1 items-center justify-center">
//           <ActivityIndicator />
//           <Text className="text-text_default_color mt-2">Loading…</Text>
//         </View>
//       ) : (
//         <>
//           <Card>
//             <Card.Content>
//               <Text variant="titleMedium" className="text-text_heading_color">
//                 {greeting}
//               </Text>
//               <Text className="text-text_default_color mt-2">
//                 Start a new booking or browse our gallery.
//               </Text>
//             </Card.Content>
//           </Card>

//           <View className="mt-4 flex-row gap-3">
//             <Button mode="contained" onPress={() => show('Go to Booking', { variant: 'info' })}>
//               New Booking
//             </Button>
//             <Button mode="outlined" onPress={() => show('Open Gallery', { variant: 'info' })}>
//               Gallery
//             </Button>
//           </View>
//         </>
//       )}
//     </View>
//   );
// }

// screens/Main/HomeScreen.tsx

// import * as React from 'react';
// import { View, Image } from 'react-native';
// import { ActivityIndicator, Button, Card, Text } from 'react-native-paper';
// import { useAuth } from '@/providers/auth-provider';
// import { useSnackbar } from '@/providers/snackbar-provider';
// import ImageCarousel from '@/components/carousel/ImageCarousel';
// import { openMaps } from '@/lib/open-maps';

// const SALON = {
//   name: 'BanLux Nail Studio',
//   lat: 13.736717,
//   lng: 100.523186,
//   address: '123 Sukhumvit Rd, Bangkok',
// };

// const CAROUSEL = [
//   {
//     id: 1,
//     uri: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1600',
//     alt: 'Minimal nude set',
//   },
//   {
//     id: 2,
//     uri: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?q=80&w=1600',
//     alt: 'French manicure',
//   },
//   {
//     id: 3,
//     uri: 'https://images.unsplash.com/photo-1619451334796-5c2f8b0e3d2e?q=80&w=1600',
//     alt: 'Glitter vibe',
//   },
// ];

// export default function HomeScreen(): React.JSX.Element {
//   const { user } = useAuth();
//   const { show } = useSnackbar();
//   const [loading, setLoading] = React.useState(false);
//   const [greeting, setGreeting] = React.useState<string | null>(null);

//   React.useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         setLoading(true);
//         await new Promise((r) => setTimeout(r, 450));
//         if (!mounted) return;
//         setGreeting(`Welcome back, ${user?.first_name ?? user?.username ?? 'Guest'}!`);
//       } catch {
//         show('Failed to load home data', { variant: 'error' });
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     })();
//     return () => {
//       mounted = false;
//     };
//   }, [user, show]);

//   const onOpenMaps = React.useCallback(() => {
//     openMaps({ lat: SALON.lat, lng: SALON.lng, label: SALON.name });
//   }, []);

//   return (
//     <View className="bg-background_color flex-1 p-4">
//       {loading ? (
//         <View className="flex-1 items-center justify-center">
//           <ActivityIndicator />
//           <Text className="text-text_default_color mt-2">Loading…</Text>
//         </View>
//       ) : (
//         <View className="gap-4">
//           {/* Greeting */}
//           <Card className="rounded-2xl">
//             <Card.Content>
//               <Text variant="titleMedium" className="text-text_heading_color">
//                 {greeting}
//               </Text>
//               <Text className="text-text_default_color mt-1">
//                 Start a new booking or browse our gallery.
//               </Text>
//             </Card.Content>
//           </Card>

//           {/* Carousel */}
//           <Card className="overflow-hidden rounded-2xl">
//             <Card.Content className="p-0">
//               <ImageCarousel
//                 data={CAROUSEL}
//                 height={220}
//                 borderRadius={16}
//                 onPressItem={(item) => show(item.alt ?? 'Image', { variant: 'info' })}
//                 testID="home-carousel"
//               />
//             </Card.Content>
//           </Card>

//           {/* Actions */}
//           <View className="mt-1 flex-row gap-3">
//             <Button mode="contained" onPress={() => show('Go to Booking', { variant: 'info' })}>
//               New Booking
//             </Button>
//             <Button mode="outlined" onPress={() => show('Open Gallery', { variant: 'info' })}>
//               Gallery
//             </Button>
//           </View>

//           {/* Map Card */}
//           <Card className="rounded-2xl">
//             <Card.Content>
//               <Text variant="titleMedium" className="text-text_heading_color">
//                 {SALON.name}
//               </Text>
//               <Text className="text-text_default_color mt-1">{SALON.address}</Text>

//               {/* Map preview (static) */}
//               <View className="mt-3 overflow-hidden rounded-xl">
//                 <Image
//                   // ใช้ Static Map (ตัวอย่าง placeholder); โปรดเปลี่ยนเป็น Static Maps API ของคุณถ้าต้องการ
//                   source={{
//                     uri: `https://maps.googleapis.com/maps/api/staticmap?center=${SALON.lat},${SALON.lng}&zoom=16&size=800x400&markers=color:red%7C${SALON.lat},${SALON.lng}`,
//                   }}
//                   resizeMode="cover"
//                   className="h-40 w-full"
//                 />
//               </View>

//               <View className="mt-3 flex-row gap-3">
//                 <Button mode="contained" icon="map-marker" onPress={onOpenMaps}>
//                   Open in Maps
//                 </Button>
//                 <Button
//                   mode="text"
//                   onPress={() => show('Call: 08x-xxx-xxxx (placeholder)', { variant: 'info' })}>
//                   Contact
//                 </Button>
//               </View>
//             </Card.Content>
//           </Card>
//         </View>
//       )}
//     </View>
//   );
// }

// // screens/Main/HomeScreen.tsx

// import * as React from 'react';
// import { View, Image, Linking, Dimensions } from 'react-native';
// import { ActivityIndicator, Button, Card, Text } from 'react-native-paper';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useAuth } from '@/providers/auth-provider';
// import { useSnackbar } from '@/providers/snackbar-provider';
// import ImageCarousel from '@/components/carousel/ImageCarousel';
// import { openMaps } from '@/lib/open-maps';
// import QuickActions from '@/components/home/QuickActions';
// import InfoChips from '@/components/home/InfoChips';
// import PromoBanner from '@/components/home/PromoBanner';

// type CarouselItem = { id: number; uri: string; alt?: string };

// const { width } = Dimensions.get('window');
// const heroH = Math.round((width * 9) / 16); // 16:9 พอดีตา

// const SALON = {
//   name: 'BanLux Nail Studio',
//   mapsUrl: 'https://maps.app.goo.gl/W3jnkudMXu9E5ZKY9?g_st=ipc',
//   address: '211, 71 ถ. ทุ่งสุขลา ต.ทุ่งสุขลา อ.ศรีราชา จ.ชลบุรี 20230',
//   shortAddress: 'ทุ่งสุขลา, ศรีราชา, ชลบุรี 20230',
//   phone: '080-053-6270',
//   rating: 4.8,
//   reviews: 214,
//   hours: '10:00–20:00 (ทุกวัน)',
// } as const;

// const CAROUSEL: CarouselItem[] = [
//   {
//     id: 1,
//     uri: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1600',
//     alt: 'Minimal nude set',
//   },
//   {
//     id: 2,
//     uri: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?q=80&w=1600',
//     alt: 'French manicure',
//   },
//   {
//     id: 3,
//     uri: 'https://images.unsplash.com/photo-1619451334796-5c2f8b0e3d2e?q=80&w=1600',
//     alt: 'Glitter vibe',
//   },
// ];

// export default function HomeScreen(): React.JSX.Element {
//   const { user } = useAuth();
//   const { show } = useSnackbar();
//   const [loading, setLoading] = React.useState(false);
//   const [openingMap, setOpeningMap] = React.useState(false);
//   const [greeting, setGreeting] = React.useState<string | null>(null);

//   React.useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         setLoading(true);
//         await new Promise((r) => setTimeout(r, 450));
//         if (!mounted) return;
//         setGreeting(`Welcome back, ${user?.first_name ?? user?.username ?? 'Guest'}!`);
//       } catch {
//         show('Failed to load home data', { variant: 'error' });
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     })();
//     return () => {
//       mounted = false;
//     };
//   }, [user, show]);

//   const onOpenMaps = React.useCallback(async () => {
//     if (openingMap) return;
//     try {
//       setOpeningMap(true);
//       await openMaps({ url: SALON.mapsUrl });
//     } finally {
//       setOpeningMap(false);
//     }
//   }, [openingMap]);

//   const onCall = React.useCallback(() => {
//     const tel = SALON.phone.replace(/\s/g, '');
//     Linking.openURL(`tel:${tel}`).catch(() => {
//       show('Cannot open dialer', { variant: 'error' });
//     });
//   }, [show]);

//   return (
//     <SafeAreaView className="bg-background_color flex-1">
//       <View className="flex-1 p-4">
//         {loading ? (
//           <View className="flex-1 items-center justify-center">
//             <ActivityIndicator />
//             <Text className="text-onSurfaceVariant mt-2">Loading…</Text>
//           </View>
//         ) : (
//           <View className="gap-4 pb-4">
//             {/* Greeting */}
//             <Card className="rounded-xl">
//               <Card.Content className="py-3">
//                 <Text variant="titleLarge" className="text-text_heading_color">
//                   {greeting}
//                 </Text>
//                 <Text className="text-onSurfaceVariant mt-1">
//                   Start a new booking or browse our gallery.
//                 </Text>
//               </Card.Content>
//             </Card>

//             {/* Carousel */}
//             <Card className="overflow-hidden rounded-xl" mode="elevated" elevation={2}>
//               <Card.Content className="p-0">
//                 <ImageCarousel
//                   data={CAROUSEL}
//                   height={heroH}
//                   borderRadius={12}
//                   onPressItem={(item) => show(item.alt ?? 'Image', { variant: 'info' })}
//                   testID="home-carousel"
//                 />
//               </Card.Content>
//             </Card>

//             {/* Quick actions (2x2)
//             <QuickActions
//               onBooking={() => show('Go to Booking', { variant: 'info' })}
//               onGallery={() => show('Open Gallery', { variant: 'info' })}
//               onPrice={() => show('View Price', { variant: 'info' })}
//               onContact={() => onCall()}
//             /> */}

//             {/* Info chips */}
//             <InfoChips
//               rating={SALON.rating}
//               reviews={SALON.reviews}
//               hours={SALON.hours}
//               shortAddress={SALON.shortAddress}
//             />

//             {/* Promo banner */}
//             <PromoBanner
//               title="💅 New! Glitter Set ลด 15% ถึงสิ้นเดือนนี้"
//               onView={() => show('View promotion details', { variant: 'info' })}
//             />

//             {/* Map card */}
//             <Card className="rounded-xl">
//               <Card.Content>
//                 <Text variant="titleMedium" className="text-text_heading_color">
//                   {SALON.name}
//                 </Text>
//                 <Text className="text-onSurfaceVariant mt-1">{SALON.address}</Text>

//                 <View className="mt-3 overflow-hidden rounded-lg">
//                   <Image
//                     source={{
//                       uri: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600',
//                     }}
//                     resizeMode="cover"
//                     className="h-40 w-full"
//                   />
//                 </View>

//                 <View className="mt-3 flex-row gap-8">
//                   <View className="flex-1">
//                     <Button
//                       mode="contained"
//                       icon="map-marker"
//                       onPress={onOpenMaps}
//                       loading={openingMap}
//                       disabled={openingMap}
//                       className="rounded-lg"
//                       contentStyle={{ height: 48 }}>
//                       Open in Maps
//                     </Button>
//                   </View>
//                   <View className="flex-1">
//                     <Button
//                       mode="outlined"
//                       icon="phone"
//                       onPress={onCall}
//                       className="rounded-lg"
//                       contentStyle={{ height: 48 }}>
//                       Call
//                     </Button>
//                   </View>
//                 </View>
//               </Card.Content>
//             </Card>
//           </View>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

// // screens/Main/HomeScreen.tsx
// import * as React from 'react';
// import { Linking, ScrollView, View } from 'react-native';
// import { Button, ActivityIndicator, Text, Divider } from 'react-native-paper';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useAuth } from '@/providers/auth-provider';
// import { useSnackbar } from '@/providers/snackbar-provider';
// import GradientHeader from '@/components/home/GradientHeader';
// import HeroGlassCard from '@/components/home/HeroGlassCard';
// import CategoryPills from '@/components/home/CategoryPills';
// import ServicesRow from '@/components/home/ServicesRow';
// import TestimonialCarousel from '@/components/home/TestimonialCarousel';
// import { openMaps } from '@/lib/open-maps';

// const SALON = {
//   name: 'BanLux Nail Studio',
//   cover: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1600',
//   mapsUrl: 'https://maps.app.goo.gl/W3jnkudMXu9E5ZKY9?g_st=ipc',
//   address: '211, 71 ถ. ทุ่งสุขลา ต.ทุ่งสุขลา อ.ศรีราชา จ.ชลบุรี 20230',
//   shortAddress: 'ทุ่งสุขลา, ศรีราชา, ชลบุรี 20230',
//   phone: '080-053-6270',
//   rating: 4.8,
//   reviews: 214,
//   hours: '10:00–20:00 (ทุกวัน)',
// } as const;

// const SERVICES = [
//   {
//     id: 1,
//     title: 'Classic Manicure',
//     price: '฿299',
//     time: '45 min',
//     image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?q=80&w=1600',
//   },
//   {
//     id: 2,
//     title: 'Gel Polish',
//     price: '฿499',
//     time: '60 min',
//     image: 'https://images.unsplash.com/photo-1619451334796-5c2f8b0e3d2e?q=80&w=1600',
//   },
//   {
//     id: 3,
//     title: 'Spa Pedicure',
//     price: '฿599',
//     time: '75 min',
//     image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600',
//   },
// ];

// const TESTIMONIALS = [
//   { id: 1, name: 'Nana', text: 'ร้านสะอาด บริการดี ลายเล็บสวยมาก 💅' },
//   { id: 2, name: 'Mint', text: 'ทำเร็ว งานละเอียด ราคาโอเค แนะนำค่ะ' },
// ];

// export default function HomeScreen(): React.JSX.Element {
//   const { user } = useAuth();
//   const { show } = useSnackbar();
//   const [loading, setLoading] = React.useState(false);
//   const [category, setCategory] = React.useState('All');
//   const [openingMap, setOpeningMap] = React.useState(false);

//   React.useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         setLoading(true);
//         await new Promise((r) => setTimeout(r, 380));
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     })();
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   const onOpenMaps = React.useCallback(async () => {
//     if (openingMap) return;
//     try {
//       setOpeningMap(true);
//       await openMaps({ url: SALON.mapsUrl });
//     } finally {
//       setOpeningMap(false);
//     }
//   }, [openingMap]);

//   const onCall = React.useCallback(() => {
//     const tel = SALON.phone.replace(/\s/g, '');
//     Linking.openURL(`tel:${tel}`).catch(() => show('Cannot open dialer', { variant: 'error' }));
//   }, [show]);

//   if (loading) {
//     return (
//       <SafeAreaView className="bg-background_color flex-1">
//         <View className="flex-1 items-center justify-center">
//           <ActivityIndicator />
//           <Text className="text-onSurfaceVariant mt-2">Loading…</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   const greeting = `Welcome back, ${user?.first_name ?? user?.username ?? 'Guest'}!`;

//   return (
//     <SafeAreaView className="bg-background_color flex-1">
//       <ScrollView contentContainerStyle={{ paddingBottom: 120 }} className="flex-1">
//         {/* HERO */}
//         <GradientHeader
//           title={greeting}
//           subtitle="Feel gorgeous, everyday."
//           imageUri={SALON.cover}
//           height={320}
//         />
//         {/* glass overlay (ลอยทับ hero) */}
//         <View className="-mt-10">
//           <HeroGlassCard
//             rating={SALON.rating}
//             reviews={SALON.reviews}
//             hours={SALON.hours}
//             shortAddress={SALON.shortAddress}
//             onMaps={onOpenMaps}
//           />
//         </View>

//         {/* Categories */}
//         <View className="mt-6">
//           <CategoryPills active={category} onChange={setCategory} />
//         </View>

//         {/* Services */}
//         <ServicesRow
//           title={category === 'All' ? 'Popular services' : `${category} services`}
//           services={SERVICES}
//         />

//         {/* Divider soft */}
//         <Divider style={{ marginTop: 24, opacity: 0.1 }} />

//         {/* Testimonials */}
//         <TestimonialCarousel items={TESTIMONIALS} />
//       </ScrollView>

//       {/* Sticky CTA bar */}
//       <View className="absolute bottom-0 left-0 right-0 px-4 pb-5">
//         <View className="flex-row items-center justify-between rounded-2xl bg-white p-3 shadow-md">
//           <View className="flex-1 pr-3">
//             <Text variant="titleMedium" className="text-text_heading_color">
//               BanLux Nail Studio
//             </Text>
//             <Text className="text-onSurfaceVariant">{SALON.shortAddress}</Text>
//           </View>
//           <View className="flex-row gap-2">
//             <Button
//               mode="outlined"
//               icon="phone"
//               className="rounded-xl"
//               contentStyle={{ height: 44 }}
//               onPress={onCall}>
//               Call
//             </Button>
//             <Button
//               mode="contained"
//               icon="calendar-check"
//               className="rounded-xl"
//               contentStyle={{ height: 44 }}
//               onPress={() => show('Open booking (tab handles nav)', { variant: 'info' })}>
//               Book now
//             </Button>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// screens/Main/HomeScreen.tsx
import * as React from 'react';
import { Dimensions, Linking, ScrollView, View } from 'react-native';
import { Button, ActivityIndicator, Text, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/providers/auth-provider';
import { useSnackbar } from '@/providers/snackbar-provider';
import WelcomeBanner from '@/components/home/WelcomeBanner';
import HeroGlassCard from '@/components/home/HeroGlassCard';
import CategoryPills from '@/components/home/CategoryPills';
import ServicesGrid from '@/components/home/ServicesGrid';
import TestimonialCarousel from '@/components/home/TestimonialCarousel';
import ImageCarousel from '@/components/carousel/ImageCarousel';
import { openMaps } from '@/lib/open-maps';
import { serviceApi } from '@/services/serviceApi';
import type { ServiceItem } from '@/types/service';

const SALON = {
  name: 'BanLux Nail Studio',
  cover: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1600',
  mapsUrl: 'https://maps.app.goo.gl/W3jnkudMXu9E5ZKY9?g_st=ipc',
  address: '211, 71 ถ. ทุ่งสุขลา ต.ทุ่งสุขลา อ.ศรีราชา จ.ชลบุรี 20230',
  shortAddress: 'ทุ่งสุขลา, ศรีราชา, ชลบุรี 20230',
  phone: '080-053-6270',
  rating: 4.8,
  reviews: 214,
  hours: '18:30–00:30 (หยุดวันอาทิตย์)',
} as const;

const CAROUSEL = [
  {
    id: 1,
    uri: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1600',
    alt: 'Minimal nude set',
  },
  {
    id: 2,
    uri: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?q=80&w=1600',
    alt: 'French manicure',
  },
  {
    id: 3,
    uri: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1600',
    alt: 'Luxury spa pedicure',
  },
  {
    id: 4,
    uri: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1600',
    alt: 'Nail art design showcase',
  },
];

const TESTIMONIALS = [
  { id: 1, name: 'Nana', text: 'ร้านสะอาด บริการดี ลายเล็บสวยมาก 💅' },
  { id: 2, name: 'Mint', text: 'ทำเร็ว งานละเอียด ราคาโอเค แนะนำค่ะ' },
];

const { width } = Dimensions.get('window');
const heroH = Math.round((width * 9) / 16);

export default function HomeScreen(): React.JSX.Element {
  const { user } = useAuth();
  const { show } = useSnackbar();

  // สถานะโหลดหน้า
  const [loading, setLoading] = React.useState(false);

  // state สำหรับ services
  const [services, setServices] = React.useState<ServiceItem[]>([]);
  const [svcLoading, setSvcLoading] = React.useState(false);

  // หมวดหมู่ (ตอนนี้ยังไม่มีจาก backend → infer จากข้อความ)
  const [category, setCategory] = React.useState('All');

  // เปิดแผนที่ / โทร
  const [openingMap, setOpeningMap] = React.useState(false);

  // โหลด splash สั้น ๆ เพื่อความนุ่มนวล
  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        await new Promise((r) => setTimeout(r, 280));
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // ดึงบริการจาก /services
  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setSvcLoading(true);
        const res = await serviceApi.list();
        if (!mounted) return;
        if (!res.ok) {
          show(res.error.message ?? 'Load services failed', { variant: 'error' });
          return;
        }
        const data = (res.data ?? []).map((x) => ({
          ...x,
          picture: x.picture || undefined,
        }));
        setServices(data);
      } catch {
        show('Network error while loading services', { variant: 'error' });
      } finally {
        if (mounted) setSvcLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [show]);

  // อนุมานหมวดหมู่จากข้อความชั่วคราว (จนกว่า backend จะส่ง category มา)
  const inferCategory = (s: ServiceItem): string => {
    const text = `${s.title} ${s.subtitle}`.toLowerCase();
    if (/acrylic/.test(text)) return 'Acrylic';
    if (/gel/.test(text)) return 'Gel';
    if (/spa|pedicure|massage/.test(text)) return 'Spa';
    if (/classic|manicure|basic/.test(text)) return 'Classic';
    return 'All';
  };

  // สร้างรายการ pill จากข้อมูลจริง (จะมี All เสมอ)
  const derivePillsFromServices = (data: ServiceItem[]) => {
    const set = new Set<string>(['All']);
    data.forEach((s) => set.add(inferCategory(s)));
    return Array.from(set).map((id) => ({ id, label: id }));
  };

  // กรองตามหมวด
  const filtered =
    category === 'All' ? services : services.filter((s) => inferCategory(s) === category);

  const onOpenMaps = React.useCallback(async () => {
    if (openingMap) return;
    try {
      setOpeningMap(true);
      await openMaps({ url: SALON.mapsUrl });
    } finally {
      setOpeningMap(false);
    }
  }, [openingMap]);

  const onCall = React.useCallback(() => {
    const tel = SALON.phone.replace(/\s/g, '');
    Linking.openURL(`tel:${tel}`).catch(() => show('Cannot open dialer', { variant: 'error' }));
  }, [show]);

  if (loading) {
    return (
      <SafeAreaView className="bg-background_color flex-1">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
          <Text className="text-onSurfaceVariant mt-2">Loading…</Text>
        </View>
      </SafeAreaView>
    );
  }

  const greeting = `Welcome back, ${user?.first_name ?? user?.username ?? 'Guest'}!`;

  return (
    <SafeAreaView className="bg-background_color flex-1">
      {/* ใช้ ScrollView + padding แนวนอนคงที่ เพื่อจัด rhythm ของหน้าให้เนียน */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        className="flex-1"
        showsVerticalScrollIndicator={false}>
        {/* 1) Welcome (บนสุด, มีแอนิเมชันจาก WelcomeBanner) */}
        <WelcomeBanner title={greeting} subtitle="Feel gorgeous, everyday." />

        {/* 2) Hero carousel แบบ edge-to-edge (ไม่ใส่ Card เพื่อเลี่ยงความเป็นกล่อง) */}
        <View className="-mx-4 mt-2">
          <ImageCarousel
            data={CAROUSEL}
            height={heroH}
            borderRadius={0}
            onPressItem={(item) => show(item.alt ?? 'Image', { variant: 'info' })}
            testID="home-carousel"
          />
        </View>

        {/* 3) Glass info chips ซ้อนเนียนใต้รูป */}
        <View className="-mt-8 px-4">
          <HeroGlassCard
            rating={SALON.rating}
            reviews={SALON.reviews}
            hours={SALON.hours}
            shortAddress={SALON.shortAddress}
            onMaps={onOpenMaps}
            phone={SALON.phone}
          />
        </View>

        {/* 4) หมวดหมู่ (dynamic ตามของจริง) */}
        <View className="mt-6 px-4">
          <CategoryPills
            active={category}
            onChange={setCategory}
            items={derivePillsFromServices(services)}
          />
        </View>

        {/* 5) Services grid (2 คอลัมน์) */}
        <View className="mt-2 px-4">
          {svcLoading ? (
            <View className="items-center justify-center py-8">
              <ActivityIndicator />
              <Text className="text-onSurfaceVariant mt-2">Loading services…</Text>
            </View>
          ) : (
            <ServicesGrid
              services={filtered}
              onPressItem={(s) => show(`Preview: ${s.title}`, { variant: 'info' })}
            />
          )}
        </View>

        {/* เส้นแบ่งบางๆ ให้หายใจ */}
        <Divider style={{ marginTop: 20, opacity: 0.06 }} />

        {/* 6) รีวิวลูกค้า */}
        {/* <View className="mt-4 px-4">
          <TestimonialCarousel items={TESTIMONIALS} />
        </View> */}

        {/* 7) Action หลักของสาขา (Maps / Call) แบบเป็นส่วนหนึ่งของหน้า */}
        {/* <View className="mt-6 px-4">
          <Text variant="titleMedium" className="text-text_heading_color">
            {SALON.name}
          </Text>
          <Text className="text-onSurfaceVariant mt-1">{SALON.address}</Text>

          <View className="mt-3 flex-row gap-8">
            <View className="flex-1">
              <Button
                mode="contained"
                icon="map-marker"
                onPress={onOpenMaps}
                loading={openingMap}
                disabled={openingMap}
                className="rounded-xl"
                contentStyle={{ height: 48 }}>
                Open in Maps
              </Button>
            </View>
            <View className="flex-1">
              <Button
                mode="outlined"
                icon="phone"
                onPress={onCall}
                className="rounded-xl"
                contentStyle={{ height: 48 }}>
                Call
              </Button>
            </View>
          </View>
        </View> */}
      </ScrollView>

      {/* Sticky CTA ล่าง */}
      {/* <View className="absolute bottom-0 left-0 right-0 px-4 pb-5">
        <View className="flex-row items-center justify-between rounded-2xl bg-white p-3 shadow-md">
          <View className="flex-1 pr-3">
            <Text variant="titleMedium" className="text-text_heading_color">
              BanLux Nail Studio
            </Text>
            <Text className="text-onSurfaceVariant">{SALON.shortAddress}</Text>
          </View>
          <View className="flex-row gap-2">
            <Button
              mode="outlined"
              icon="phone"
              className="rounded-xl"
              contentStyle={{ height: 44 }}
              onPress={onCall}>
              Call
            </Button>
            <Button
              mode="contained"
              icon="calendar-check"
              className="rounded-xl"
              contentStyle={{ height: 44 }}
              onPress={() => show('Open booking (tab handles nav)', { variant: 'info' })}>
              Book now
            </Button>
          </View>
        </View>
      </View> */}
    </SafeAreaView>
  );
}
