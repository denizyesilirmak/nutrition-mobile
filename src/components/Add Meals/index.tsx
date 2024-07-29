import { Image, Pressable, Text, View } from "react-native";
import TextInput from "../TextInput";
import { useState } from "react";
import { FlashList } from "@shopify/flash-list";

import {
  Food as FoodType,
  useFoodSearch,
} from "@/src/query/hooks/useFoodSearch";
import useDebounce from "@/src/hooks/useDebounce";
import Animated, { SlideInRight } from "react-native-reanimated";

const getRandomColorFromStr = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
};

const Food = ({
  food,
  onSelectedFood,
}: {
  food: FoodType;
  onSelectedFood: (food: FoodType) => void;
}) => {
  return (
    <Pressable
      className="mb-2 flex flex-row items-center justify-start bg-gray-100 p-4 dark:bg-gray-800"
      style={{ borderRadius: 10 }}
      onPress={() => {
        onSelectedFood(food);
      }}
    >
      <Image
        source={{ uri: food.image }}
        className="mr-2 h-16 w-16 rounded-lg border-2 border-green-500 dark:border-lime-500"
        style={{ backgroundColor: getRandomColorFromStr(food.name) }}
      />
      <Text
        numberOfLines={1}
        className="text-black-400 flex-1 text-lg font-semibold dark:text-gray-100"
      >
        {food.name}
      </Text>
    </Pressable>
  );
};

const AddMeals = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { results, fetchNextPage } = useFoodSearch({
    searchTerm: debouncedSearchTerm,
  });
  const [selectedFoods, setSelectedFoods] = useState<FoodType[]>([]);

  return (
    <View className="flex-1 flex-col items-center justify-center gap-2 p-4">
      <Text className="text-black-400 text-xl font-semibold dark:text-gray-100">
        Add Meals / Breakfast 🍳
      </Text>
      <View className="h-min w-full rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
        <View className="flex flex-row items-center justify-start gap-2 p-4">
          {selectedFoods.map((food) => (
            <Animated.Image
              entering={SlideInRight}
              key={food.id}
              source={{ uri: food.image }}
              className="h-12 w-12 rounded-lg border-2 border-green-500 dark:border-lime-500"
              style={{ backgroundColor: getRandomColorFromStr(food.name) }}
            />
          ))}
        </View>
      </View>
      <TextInput
        placeholder="Search for food"
        keyboardType="default"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <View className="w-full flex-1">
        <FlashList
          data={results}
          keyExtractor={(food) => food.id}
          renderItem={({ item }) => (
            <Food
              food={item}
              onSelectedFood={(food) => {
                //add only unique foods using filter
                setSelectedFoods((foods) => {
                  if (foods.some((f) => f.id === food.id)) {
                    return foods;
                  }
                  return [...foods, food];
                });
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={122}
          onEndReachedThreshold={1.8}
          onEndReached={() => {
            fetchNextPage();
          }}
        />
      </View>
    </View>
  );
};

export default AddMeals;
