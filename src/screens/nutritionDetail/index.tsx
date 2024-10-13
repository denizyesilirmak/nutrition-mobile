import ScreenView from "@/src/components/ScreenView";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import nutritionInfo from "./constants";

const NutritionDetail = () => {
  const { nutrientId } = useLocalSearchParams();

  console.log({ nutrientId });

  return (
    <ScreenView scrollable padding>
      <Text className="text-3xl font-bold text-black dark:text-white">
        {nutritionInfo[nutrientId].name}
      </Text>
      <View className="mt-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800 gap-2">
        <Text className="text-xl font-bold text-black dark:text-white">
          Description
        </Text>
        <Text className="text-m font-normal text-black dark:text-white">
          {nutritionInfo[nutrientId].description}
        </Text>
      </View>

      <View className="mt-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800 gap-2">
        <Text className="text-xl font-bold text-black dark:text-white">
          Consumption of {nutritionInfo[nutrientId].name}
        </Text>
        <Text className="text-m font-normal text-black dark:text-white">
          {nutritionInfo[nutrientId].consumption}
        </Text>
      </View>

      <View className="mt-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800 gap-2">
        <Text className="text-xl font-bold text-black dark:text-white">
          Benefits of {nutritionInfo[nutrientId].name}
        </Text>
        <Text className="text-m font-normal text-black dark:text-white">
          {nutritionInfo[nutrientId].benefits}
        </Text>
      </View>
    </ScreenView>
  );
};
export default NutritionDetail;
