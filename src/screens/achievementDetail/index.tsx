import { Image, Text, View } from "react-native";

const AchievementDetail = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="mb-4 text-xl font-semibold text-black dark:text-white">
        Achievement Detail
      </Text>
      <Image
        source={require("@/src/assets/images/badges/badge-icon-1.png")}
        className="h-40 w-40"
        resizeMode="stretch"
      />
    </View>
  );
};

export default AchievementDetail;
