import { Food } from "@/src/query/hooks/useFoodSearch";
import { Pressable, Text, View } from "react-native";
import Image from "../Image";
import ChartPercentage from "../ChartPercentage";
import { router } from "expo-router";

const FoodListItem = ({ food }: { food: Food }) => {
  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/foodDetail",
          params: {
            foodId: food.id,
          },
        });
      }}
      className="mb-1ƒ w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-black"
    >
      <View className="flex flex-row p-4">
        <Image
          source={{ uri: "http://akrepnalan.com/nalan_imaj/p1.jpg" }}
          className="h-20 w-20 rounded-lg border-2 border-green-500 dark:border-lime-500"
        />

        <View className="ml-2 flex flex-1 flex-col">
          <Text
            numberOfLines={1}
            className="flex-1 text-lg font-semibold text-black dark:text-white"
          >
            {food.name}
          </Text>
          <Text className="mb-1 text-sm font-semibold text-gray-500 dark:text-gray-400">
            {food.energy} kcal
          </Text>
          <View className="flex flex-row justify-between">
            <View className="rounded-lg bg-orange-300 px-2 py-1">
              <Text className="text-xs text-gray-700 dark:text-gray-900">
                {food.carbonhydrate}g Carbs
              </Text>
            </View>
            <View className="rounded-lg bg-blue-300 px-2 py-1">
              <Text className="text-xs text-gray-700 dark:text-gray-900">
                {food.protein}g Protein
              </Text>
            </View>
            <View className="rounded-lg bg-red-300 px-2 py-1">
              <Text className="text-xs text-gray-700 dark:text-gray-900">
                {food.fat}g Fat
              </Text>
            </View>
          </View>
        </View>
      </View>
      <ChartPercentage
        items={[
          { value: food.carbonhydrate, color: "#ffb55a" },
          { value: food.protein, color: "#7eb0d5" },
          { value: food.fat, color: "#fd7f6f" },
        ]}
      />
    </Pressable>
  );
};

export default FoodListItem;
