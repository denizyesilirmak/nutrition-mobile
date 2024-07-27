import ScreenView from "@/src/components/ScreenView";
import Table from "@/src/components/Table";
import { useLocalSearchParams } from "expo-router";
import { Image, Text, useColorScheme, View } from "react-native";
import { Defs, LinearGradient, Rect, Stop, Svg } from "react-native-svg";

const FoodDetail = () => {
  const colorScheme = useColorScheme();
  const stopColor = colorScheme === "dark" ? "#000000" : "#ffffff";

  const { foodId } = useLocalSearchParams();

  console.log("[FoodDetail] foodId", foodId);

  return (
    <ScreenView>
      <View className="h-80 items-center">
        <Image
          source={{
            uri: "https://www.webtekno.com/images/editor/default/0004/15/be202f3bf456677b583865bd1ab3b0e350b28fae.jpeg",
          }}
          className="absolute h-80 w-full"
          resizeMode="cover"
        />
        <Svg
          width="100%"
          height="200"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute"
        >
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={stopColor} stopOpacity="1" />
              <Stop offset="0.1" stopColor={stopColor} stopOpacity="1" />
              <Stop offset="0.4" stopColor={stopColor} stopOpacity="0.5" />
              <Stop offset="1" stopColor={stopColor} stopOpacity="0" />
            </LinearGradient>
          </Defs>

          <Rect x="0" y="0" width="100" height="100" fill="url(#grad)" />
        </Svg>
        <Text className="absolute py-4 text-lg font-semibold text-gray-500 dark:text-gray-100">
          Rice with Chicken and Vegetables
        </Text>
      </View>
      <View
        className="flex-1 p-4"
        style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
      >
        <Text className="text-lg font-semibold text-black dark:text-white">
          Macro Nutrients
        </Text>
        <View className="mb-4 mt-4 flex flex-row justify-between gap-3">
          <View className="flex-1 items-center justify-center rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
            <Text className="text-md text-gray-500 dark:text-gray-400">
              Carbs
            </Text>
            <Text className="text-lg font-semibold text-black dark:text-white">
              350
            </Text>
          </View>

          <View className="flex-1 items-center justify-center rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
            <Text className="text-md text-gray-500 dark:text-gray-400">
              Protein
            </Text>
            <Text className="text-lg font-semibold text-black dark:text-white">
              450
            </Text>
          </View>

          <View className="flex-1 items-center justify-center rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
            <Text className="text-md text-gray-500 dark:text-gray-400">
              Fat
            </Text>
            <Text className="text-lg font-semibold text-black dark:text-white">
              150
            </Text>
          </View>
        </View>

        <Text className="text-lg font-semibold text-black dark:text-white">
          Others
        </Text>
        <Table
          items={[
            { name: "Energy", value: 100 },
            { name: "Sugar", value: 20 },
            { name: "Fiber", value: 10 },
            { name: "Sodium", value: 5 },
            { name: "Cholesterol", value: 0 },
            { name: "Vitamin A", value: 0 },
            { name: "Vitamin C", value: 0 },
            { name: "Calcium", value: 0 },
            { name: "Iron", value: 0 },
            { name: "Potassium", value: 0 },
          ]}
        />
      </View>
    </ScreenView>
  );
};

export default FoodDetail;
