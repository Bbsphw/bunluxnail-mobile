// lib/open-maps.ts
import { Linking, Platform } from 'react-native';

type OpenMapsArgs =
  | { url: string } // กรณีมีลิงก์ Google Maps โดยตรง
  | {
      lat: number;
      lng: number;
      label?: string;
    };

export async function openMaps(args: OpenMapsArgs) {
  // ถ้ามีลิงก์มาแล้ว เปิดเลย (ง่าย/ชัวร์)
  if ('url' in args && args.url) {
    try {
      const can = await Linking.canOpenURL(args.url);
      if (can) return Linking.openURL(args.url);
      // fallback web
      return Linking.openURL(args.url);
    } catch {
      return Linking.openURL(args.url);
    }
  }

  //   // ไม่มี url → ใช้พิกัด/ชื่อร้าน
  //   const { lat, lng, label = 'Salon' } = args;
  //   const latLng = `${lat},${lng}`;

  //   const iosUrl = `http://maps.apple.com/?ll=${latLng}&q=${encodeURIComponent(label)}`;
  //   const gmaps = Platform.select({
  //     ios: `comgooglemaps://?q=${encodeURIComponent(label)}&center=${latLng}`,
  //     android: `geo:${latLng}?q=${latLng}(${encodeURIComponent(label)})`,
  //     default: `https://www.google.com/maps/search/?api=1&query=${latLng}`,
  //   });

  //   try {
  //     if (Platform.OS === 'ios') {
  //       const canOpenGmaps = await Linking.canOpenURL('comgooglemaps://');
  //       if (canOpenGmaps && gmaps) return Linking.openURL(gmaps);
  //       return Linking.openURL(iosUrl);
  //     }
  //     if (gmaps) return Linking.openURL(gmaps);
  //     return Linking.openURL(`https://www.google.com/maps?q=${latLng}`);
  //   } catch {
  //     return Linking.openURL(`https://www.google.com/maps?q=${latLng}`);
  //   }
}
