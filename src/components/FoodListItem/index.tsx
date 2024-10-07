import { Pressable, Text, View } from "react-native";
import Image from "../Image";
import ChartPercentage from "../ChartPercentage";
import { router } from "expo-router";
import { Food } from "@/src/screens/home/types";
import { Datum } from "@/src/query/hooks/useFoodSearch";

const FoodListItem = ({ food }: { food: Datum }) => {
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
      className="w-full bg-white p-2 py-1 dark:bg-black"
    >
      <View className="flex-1 rounded-xl bg-gray-100 p-2 dark:bg-gray-800">
        <View className="mb-2 flex-row">
          <Image
            source={{ uri: food.image }}
            style={{ width: 60, height: 60, borderRadius: 4 }}
          />
          <View className="pl-2 pt-1">
            <Text
              numberOfLines={1}
              className="text-md mb-1 font-semibold color-black dark:color-white"
            >
              {food.name}
            </Text>
            <Text className="text-sm text-gray-500">Food detail text</Text>
          </View>
        </View>
        <View className="border-b border-gray-200 dark:border-gray-700" />
        <View className="mt-2 flex-row justify-between px-2">
          <Text className="text-xs color-black dark:color-white">
            energy: {food.energy} cal
          </Text>
          <Text className="text-xs color-black dark:color-white">
            carbs: {food.carbonhydrate} gr
          </Text>
          <Text className="text-xs color-black dark:color-white">
            fat: {food.fat} gr
          </Text>
          <Text className="text-xs color-black dark:color-white">
            protein: {food.protein} gr
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default FoodListItem;
