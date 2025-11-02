// // components/profile/AvatarPicker.tsx

// import * as React from 'react';
// import { View, Image, Pressable } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { Text, IconButton } from 'react-native-paper';

// type Props = {
//   uri?: string | null; // base64 dataURL หรือ http url
//   onChange?: (file: { uri: string; name: string; type: string } | null) => void;
// };

// export default function AvatarPicker({ uri, onChange }: Props) {
//   const [localUri, setLocalUri] = React.useState<string | undefined>(uri || undefined);

//   const pick = React.useCallback(async () => {
//     const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!perm.granted) return;

//     const res = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       aspect: [1, 1],
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.9,
//     });
//     if (res.canceled) return;

//     const asset = res.assets?.[0];
//     if (!asset?.uri) return;

//     const file = {
//       uri: asset.uri,
//       name: `avatar_${Date.now()}.jpg`,
//       type: 'image/jpeg',
//     };
//     setLocalUri(asset.uri);
//     onChange?.(file);
//   }, [onChange]);

//   return (
//     <View className="items-center">
//       <Pressable onPress={pick} className="relative">
//         <Image
//           source={
//             localUri
//               ? { uri: localUri }
//               : { uri: 'https://api.dicebear.com/7.x/initials/png?seed=BN' }
//           }
//           className="h-28 w-28 rounded-full"
//         />
//         <IconButton
//           icon="camera-outline"
//           size={18}
//           mode="contained"
//           style={{ position: 'absolute', right: -6, bottom: -6, borderRadius: 999 }}
//         />
//       </Pressable>
//       <Text className="text-onSurfaceVariant mt-2">Tap to change photo</Text>
//     </View>
//   );
// }

// components/profile/AvatarPicker.tsx
import * as React from 'react';
import { View, Image, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Text, IconButton } from 'react-native-paper';

export type AvatarFile = {
  uri: string; // file://...
  name: string; // avatar_*.jpg
  type: string; // image/jpeg | image/png
};

type Props = {
  uri?: string | null; // รองรับ data:, http, หรือ file://
  onChange?: (file: AvatarFile | null) => void;
};

export default function AvatarPicker({ uri, onChange }: Props) {
  const [localUri, setLocalUri] = React.useState<string | undefined>(uri || undefined);

  const pick = React.useCallback(async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return;

    const res = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.9,
    });
    if (res.canceled) return;

    const asset = res.assets?.[0];
    if (!asset?.uri) return;

    const file: AvatarFile = {
      uri: asset.uri,
      name: `avatar_${Date.now()}.jpg`,
      type: 'image/jpeg',
    };
    setLocalUri(asset.uri);
    onChange?.(file);
  }, [onChange]);

  return (
    <View className="items-center">
      <Pressable onPress={pick} className="relative">
        <Image
          source={
            localUri
              ? { uri: localUri }
              : { uri: 'https://api.dicebear.com/7.x/initials/png?seed=BN' }
          }
          className="h-28 w-28 rounded-full"
        />
        <IconButton
          icon="camera-outline"
          size={18}
          mode="contained"
          style={{ position: 'absolute', right: -6, bottom: -6, borderRadius: 999 }}
        />
      </Pressable>
      <Text className="text-onSurfaceVariant mt-2">Tap to change photo</Text>
    </View>
  );
}
