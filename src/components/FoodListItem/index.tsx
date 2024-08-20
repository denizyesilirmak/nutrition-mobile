import { Pressable, Text, View } from "react-native";
import Image from "../Image";
import ChartPercentage from "../ChartPercentage";
import { router } from "expo-router";
import { Food } from "@/src/screens/home/types";

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
      className="w-full bg-white p-2 py-1 dark:bg-black"
    >
      <View className="flex-1 rounded-xl bg-gray-100 p-2 dark:bg-gray-800">
        <View className="mb-2 flex-row">
          <Image
            source={{ uri: food.image }}
            className="h-16 w-16 rounded-2xl bg-red-500"
          />
          <View className="pl-2 pt-1">
            <Text
              numberOfLines={1}
              className="text-md mb-1 font-semibold color-black dark:color-white"
            >
              {food.name}
            </Text>
            <Text className="text-sm text-gray-500">{food.id}</Text>
          </View>
        </View>
        <View className="border-b border-gray-200 dark:border-gray-700" />
        <View className="mt-2 flex-row justify-between px-2">
          <Text className="text-xs color-white">energy: {food.energy} cal</Text>
          <Text className="text-xs color-white">
            carbs: {food.carbohydrate} gr
          </Text>
          <Text className="text-xs color-white">fat: {food.energy} gr</Text>
          <Text className="text-xs color-white">protein: {food.energy} gr</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default FoodListItem;
