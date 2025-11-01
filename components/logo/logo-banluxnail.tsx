import { Image, View } from 'react-native';

export default function LogoBanLuxNail() {
  const logo = require('@/assets/images/banluxnail-logo.png');

  return (
    <>
      {/* Header / Logo */}
      <View className="mt-8 items-center">
        <Image
          source={logo}
          accessibilityLabel="Ban Lux Lep"
          style={{ width: 400, height: 100, resizeMode: 'contain' }}
        />
      </View>
    </>
  );
}
