import TextInput from "@/src/components/TextInput";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import useDebounce from "@/src/hooks/useDebounce";
import {
  Food as FoodType,
  useFoodSearch,
} from "@/src/query/hooks/useFoodSearch";
import Animated, { FadeInRight } from "react-native-reanimated";
import useInsertMeal from "@/src/query/hooks/useInsertMeal";
import IconButton from "@/src/components/IconButton";
import { Ionicons } from "@expo/vector-icons";

const Food = ({
  food,
  onSelectedFood,
}: {
  food: FoodType;
  onSelectedFood: (food: FoodType) => void;
}) => {
  return (
    <Pressable
      className="mb-2 flex flex-row items-center justify-start gap-2 bg-gray-100 p-4 dark:bg-gray-800"
      style={{ borderRadius: 10 }}
      onPress={() => {
        onSelectedFood(food);
      }}
    >
      <Image
        source={`https://picsum.photos/seed/${food.id}/200/300`}
        style={{
          width: 64,
          height: 64,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: "#10B981",
        }}
        contentFit="cover"
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

const SkeletonItem = () => {
  return (
    <Animated.View className="h-26 mb-2 w-full rounded-lg bg-gray-100 p-4">
      <View
        className="rounded-lg border-2 border-green-500 dark:border-lime-500"
        style={{
          width: 64,
          height: 64,
        }}
      />
    </Animated.View>
  );
};

const AddMeals = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { results, fetchNextPage, isLoading } = useFoodSearch({
    searchTerm: debouncedSearchTerm,
  });
  const [selectedFoods, setSelectedFoods] = useState<FoodType[]>([]);
  const { insertMeal, isPending, isSuccess } = useInsertMeal({
    foods: selectedFoods.map((food) => ({
      id: food.id,
      multiplier: 1,
    })),
    mealTime: "dinner",
  });

  return (
    <View className="flex-1 flex-col items-center justify-center gap-2 p-4">
      <Text className="text-black-400 text-xl font-semibold dark:text-gray-100">
        Add Meals / Breakfast 🍳
      </Text>
      <View className="h-min w-full rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
        <View className="flex h-16 flex-row items-center justify-start gap-2 p-2">
          {selectedFoods.length < 1 ? (
            <Text className="text-black-400 text-sm font-semibold dark:text-gray-100">
              No foods selected
            </Text>
          ) : (
            selectedFoods.map((food) => (
              <Pressable
                key={food.id}
                onPress={() => {
                  setSelectedFoods((foods) => {
                    return foods.filter((f) => f.id !== food.id);
                  });
                }}
              >
                <Animated.Image
                  entering={FadeInRight}
                  key={food.id}
                  source={{
                    uri: `https://picsum.photos/seed/${food.id}/200/300`,
                  }}
                  className="h-14 w-14 rounded-lg border-2 border-green-500 dark:border-lime-500"
                />
              </Pressable>
            ))
          )}
          <IconButton
            icon={<Ionicons name="add" size={24} color="red" />}
            onPress={() => {
              insertMeal();
            }}
          />
        </View>
      </View>
      <TextInput
        placeholder="Search for food"
        keyboardType="default"
        value={searchTerm}
        onChangeText={setSearchTerm}
        icon={isLoading ? "autorenew" : "search"}
      />
      <View className="w-full flex-1">
        {isLoading && (
          <View className="absolute bottom-0 left-0 right-0 top-0 z-50 flex-1 opacity-30">
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
          </View>
        )}
        <FlashList
          bounces={true}
          data={results}
          keyExtractor={(food) => food.id}
          renderItem={({ item }) => (
            <Food
              food={item}
              onSelectedFood={(food) => {
                setSelectedFoods((foods) => {
                  // Prevent adding more than 3 foods
                  if (foods.length >= 3) {
                    alert("You can only add 3 foods per meal");
                    return foods;
                  }

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
          onEndReachedThreshold={3}
          onEndReached={() => {
            fetchNextPage();
          }}
          ListEmptyComponent={() => {
            return (
              <View className="flex-1 items-center justify-center gap-2 p-2">
                {/* <Text className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                  Type to search for foods
                </Text>
                <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Especially the ones that good for your health 🥦
                </Text> */}
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default AddMeals;
