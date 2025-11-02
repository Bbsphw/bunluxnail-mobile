// // components/carousel/ImageCarousel.tsx

// import * as React from 'react';
// import {
//   View,
//   FlatList,
//   Image,
//   Dimensions,
//   Pressable,
//   Animated,
//   NativeScrollEvent,
//   NativeSyntheticEvent,
// } from 'react-native';

// type CarouselItem = {
//   id: string | number;
//   uri: string;
//   alt?: string;
// };

// type Props = {
//   data: CarouselItem[];
//   height?: number; // default 200
//   borderRadius?: number; // default 16
//   autoPlay?: boolean; // default true
//   intervalMs?: number; // default 3000
//   onPressItem?: (item: CarouselItem) => void;
//   testID?: string;
// };

// /**
//  * Lightweight Animated Carousel (no extra deps)
//  * - Snap paging
//  * - Animated scale on center item
//  * - Autoplay with pause on touch
//  */
// export default function ImageCarousel({
//   data,
//   height = 200,
//   borderRadius = 16,
//   autoPlay = true,
//   intervalMs = 3000,
//   onPressItem,
//   testID,
// }: Props): React.JSX.Element {
//   const { width } = Dimensions.get('window');
//   const ITEM_WIDTH = width;
//   const scrollX = React.useRef(new Animated.Value(0)).current;
//   const listRef = React.useRef<FlatList<CarouselItem>>(null);
//   const idxRef = React.useRef(0);
//   const timerRef = React.useRef<NodeJS.Timeout | null>(null);
//   const isUserInteractingRef = React.useRef(false);

//   const startAuto = React.useCallback(() => {
//     if (!autoPlay || data.length <= 1) return;
//     stopAuto();
//     timerRef.current = setInterval(() => {
//       if (isUserInteractingRef.current) return;
//       idxRef.current = (idxRef.current + 1) % data.length;
//       listRef.current?.scrollToIndex({ index: idxRef.current, animated: true });
//     }, intervalMs);
//   }, [autoPlay, data.length, intervalMs]);

//   const stopAuto = React.useCallback(() => {
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//     }
//   }, []);

//   React.useEffect(() => {
//     startAuto();
//     return () => stopAuto();
//   }, [startAuto, stopAuto]);

//   const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
//     useNativeDriver: true,
//   });

//   const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
//     const offsetX = e.nativeEvent.contentOffset.x;
//     const index = Math.round(offsetX / ITEM_WIDTH);
//     idxRef.current = index;
//   };

//   const onTouchStart = () => {
//     isUserInteractingRef.current = true;
//     stopAuto();
//   };
//   const onTouchEnd = () => {
//     isUserInteractingRef.current = false;
//     startAuto();
//   };

//   return (
//     <View className="w-full" style={{ height }} testID={testID}>
//       <Animated.FlatList
//         ref={listRef}
//         data={data}
//         keyExtractor={(it) => String(it.id)}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onScroll={onScroll}
//         onMomentumScrollEnd={onMomentumEnd}
//         onTouchStart={onTouchStart}
//         onTouchEnd={onTouchEnd}
//         onScrollBeginDrag={onTouchStart}
//         onScrollEndDrag={onTouchEnd}
//         renderItem={({ item, index }) => {
//           const inputRange = [
//             (index - 1) * ITEM_WIDTH,
//             index * ITEM_WIDTH,
//             (index + 1) * ITEM_WIDTH,
//           ];
//           const scale = scrollX.interpolate({
//             inputRange,
//             outputRange: [0.95, 1, 0.95],
//             extrapolate: 'clamp',
//           });
//           const opacity = scrollX.interpolate({
//             inputRange,
//             outputRange: [0.9, 1, 0.9],
//             extrapolate: 'clamp',
//           });

//           return (
//             <View style={{ width: ITEM_WIDTH, height }} className="px-0">
//               <Animated.View style={{ flex: 1, transform: [{ scale }], opacity }} className="px-4">
//                 <Pressable
//                   className="flex-1 overflow-hidden"
//                   style={{ borderRadius }}
//                   onPress={() => onPressItem?.(item)}
//                   accessibilityRole="imagebutton"
//                   accessibilityLabel={item.alt ?? 'Promo image'}>
//                   <Image source={{ uri: item.uri }} resizeMode="cover" className="h-full w-full" />
//                 </Pressable>
//               </Animated.View>
//             </View>
//           );
//         }}
//       />

//       {/* Pagination Dots */}
//       <View className="absolute bottom-2 left-0 right-0 flex-row items-center justify-center">
//         {data.map((_, i) => {
//           const inputRange = [(i - 1) * ITEM_WIDTH, i * ITEM_WIDTH, (i + 1) * ITEM_WIDTH];
//           const dotWidth = scrollX.interpolate({
//             inputRange,
//             outputRange: [6, 18, 6],
//             extrapolate: 'clamp',
//           });
//           const bg = scrollX.interpolate({
//             inputRange,
//             outputRange: [0.6, 1, 0.6],
//             extrapolate: 'clamp',
//           });

//           return (
//             <Animated.View
//               // eslint-disable-next-line react/no-array-index-key
//               key={`dot-${i}`}
//               className="mx-1 h-1.5 rounded-full"
//               style={{
//                 width: dotWidth,
//                 backgroundColor: 'rgba(75,53,42,1)',
//                 opacity: bg,
//               }}
//             />
//           );
//         })}
//       </View>
//     </View>
//   );
// }

// // components/carousel/ImageCarousel.tsx
// import * as React from 'react';
// import {
//   View,
//   Image,
//   Pressable,
//   Dimensions,
//   Animated,
//   FlatList,
//   NativeScrollEvent,
//   NativeSyntheticEvent,
// } from 'react-native';

// type Item = { id: number | string; uri: string; alt?: string };
// type Props = {
//   data: Item[];
//   height?: number;
//   borderRadius?: number;
//   intervalMs?: number;
//   onPressItem?: (item: Item) => void;
//   testID?: string;
// };

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// export default function ImageCarousel({
//   data,
//   height = 220,
//   borderRadius = 16,
//   intervalMs = 3500,
//   onPressItem,
//   testID,
// }: Props): React.JSX.Element {
//   const scrollX = React.useRef(new Animated.Value(0)).current;
//   const listRef = React.useRef<FlatList<Item>>(null);
//   const indexRef = React.useRef(0);
//   const timerRef = React.useRef<NodeJS.Timeout | null>(null);

//   const startAuto = React.useCallback(() => {
//     if (timerRef.current || data.length <= 1) return;
//     timerRef.current = setInterval(() => {
//       const next = (indexRef.current + 1) % data.length;
//       listRef.current?.scrollToIndex({ index: next, animated: true });
//       indexRef.current = next;
//     }, intervalMs);
//   }, [data.length, intervalMs]);

//   const stopAuto = React.useCallback(() => {
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//     }
//   }, []);

//   React.useEffect(() => {
//     startAuto();
//     return () => stopAuto();
//   }, [startAuto, stopAuto]);

//   const onScroll = Animated.event(
//     [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//     { useNativeDriver: true } // ✅ ปลอดภัยเพราะเราไม่ animate width แล้ว
//   );

//   const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
//     const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
//     indexRef.current = idx;
//   };

//   const renderItem = ({ item }: { item: Item }) => (
//     <Pressable onPress={() => onPressItem?.(item)}>
//       <Image
//         source={{ uri: item.uri }}
//         style={{ width: SCREEN_WIDTH, height, borderRadius }}
//         resizeMode="cover"
//       />
//     </Pressable>
//   );

//   return (
//     <View testID={testID}>
//       <Animated.FlatList
//         ref={listRef}
//         data={data}
//         keyExtractor={(it) => String(it.id)}
//         renderItem={renderItem}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onScrollBeginDrag={stopAuto}
//         onScrollEndDrag={startAuto}
//         onMomentumScrollEnd={onMomentumEnd}
//         scrollEventThrottle={16}
//         onScroll={onScroll}
//         // ป้องกัน error layout bounce บางเครื่อง
//         removeClippedSubviews
//         windowSize={3}
//         initialNumToRender={1}
//         maxToRenderPerBatch={2}
//       />

//       {/* Indicators */}
//       <View
//         style={{
//           position: 'absolute',
//           bottom: 10,
//           left: 0,
//           right: 0,
//           flexDirection: 'row',
//           justifyContent: 'center',
//           gap: 6,
//         }}>
//         {data.map((_, i) => {
//           const inputRange = [(i - 1) * SCREEN_WIDTH, i * SCREEN_WIDTH, (i + 1) * SCREEN_WIDTH];
//           const opacity = scrollX.interpolate({
//             inputRange,
//             outputRange: [0.4, 1, 0.4],
//             extrapolate: 'clamp',
//           });
//           const scale = scrollX.interpolate({
//             inputRange,
//             outputRange: [0.8, 1.15, 0.8],
//             extrapolate: 'clamp',
//           });
//           return (
//             <Animated.View
//               key={i}
//               style={{
//                 width: 8, // ✅ ไม่ animate width
//                 height: 8,
//                 borderRadius: 4,
//                 backgroundColor: '#4B352A',
//                 opacity,
//                 transform: [{ scale }], // ✅ ใช้ transform (รองรับ native driver)
//               }}
//             />
//           );
//         })}
//       </View>
//     </View>
//   );
// }

// components/carousel/ImageCarousel.tsx
import * as React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  View,
} from 'react-native';

type Item = { id: number | string; uri: string; alt?: string };

type Props = {
  data: Item[];
  height: number;
  borderRadius?: number;
  onPressItem?: (item: Item) => void;
  testID?: string;
};

export default function ImageCarousel({
  data,
  height,
  borderRadius = 0,
  onPressItem,
  testID,
}: Props) {
  const { width: itemWidth } = Dimensions.get('window');
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef<ScrollView | null>(null);
  const [index, setIndex] = React.useState(0);

  // Auto-slide ทุก 3.2s
  React.useEffect(() => {
    if (!data.length) return;
    const t = setInterval(() => {
      const next = index + 1 + 0; // next index
      const actual = next % data.length;
      ref.current?.scrollTo({ x: actual * itemWidth, animated: true });
      setIndex(actual);
    }, 3200);
    return () => clearInterval(t);
  }, [index, data.length, itemWidth]);

  const onMomentum = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const w = e.nativeEvent.layoutMeasurement.width || itemWidth;
    const i = Math.round(e.nativeEvent.contentOffset.x / w);
    setIndex(i);
  };

  return (
    <View testID={testID}>
      <Animated.ScrollView
        ref={ref}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentum}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false } // หลีกเลี่ยง error width กับ native driver
        )}
        scrollEventThrottle={16}
        style={{ height }}>
        {data.map((it) => (
          <View key={it.id} style={{ width: itemWidth, height }}>
            <View
              style={{
                borderRadius,
                overflow: borderRadius ? 'hidden' : 'visible',
                width: '100%',
                height: '100%',
              }}>
              <Pressable style={{ flex: 1 }} onPress={() => onPressItem?.(it)}>
                <Image
                  source={{ uri: it.uri }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              </Pressable>
            </View>
          </View>
        ))}
      </Animated.ScrollView>

      {/* Dots */}
      <View className="absolute bottom-3 left-0 right-0 flex-row justify-center gap-2">
        {data.map((_, i) => (
          <View
            key={i}
            className={`h-2 rounded-full ${i === index ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
          />
        ))}
      </View>
    </View>
  );
}
