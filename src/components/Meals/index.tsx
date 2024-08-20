import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import IconButton from "../IconButton";
import { MealsProps } from "./types";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";

const MealHeader = ({
  title,
  calories,
  mealTime,
}: {
  title: string;
  calories: number;
  mealTime: string;
}) => {
  const { colorScheme } = useColorScheme();

  return (
    <View className="p flex flex-row items-center justify-between rounded-lg bg-gray-100 px-2 dark:bg-gray-700">
      <Text className="text-black-400 text-md font-semibold dark:text-gray-100">
        {title}{" "}
        <Text className="text-xs text-gray-400 dark:text-gray-300">
          ({Math.round(calories)} cal)
        </Text>
      </Text>
      <IconButton
        icon={
          <Ionicons
            name="add"
            size={18}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        }
        onPress={() => {
          router.push(`/addMeal?mealTime=${mealTime}`);
        }}
      />
    </View>
  );
};

const MealItem = ({ title, calories }: { title: string; calories: number }) => {
  return (
    <Animated.View
      entering={FadeInLeft}
      className="flex flex-row items-center justify-between px-4 py-3"
    >
      <Text
        className="text-black-400 text-md w-3/4 dark:text-gray-100"
        numberOfLines={1}
      >
        {title}
      </Text>
      <Text className="text-xs text-gray-400 dark:text-gray-300">
        {calories} cal
      </Text>
    </Animated.View>
  );
};

const NoRecords = () => {
  return (
    <View className="flex flex-col justify-center px-4 py-3">
      <Text className="text-black-400 text-md dark:text-gray-100">
        No records found
      </Text>
    </View>
  );
};

const keyGenerator = (id: string) => {
  return id + Math.random().toString();
};

const Meals = ({ meals, energyNeedPerMeal }: MealsProps) => {
  if (!meals) {
    return (
      <View className="overflow-hidden rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
        <MealHeader
          title="🥞 Breakfast"
          calories={energyNeedPerMeal.breakfast || 0}
          mealTime="breakfast"
        />
        <NoRecords />
        <MealHeader
          title="🥘 Lunch"
          calories={energyNeedPerMeal.lunch || 0}
          mealTime="lunch"
        />
        <NoRecords />
        <MealHeader
          title="🍲 Dinner"
          calories={energyNeedPerMeal.lunch || 0}
          mealTime="dinner"
        />
        <NoRecords />
      </View>
    );
  }

  return (
    <View className="overflow-hidden rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
      <MealHeader
        title="🥞 Breakfast"
        calories={energyNeedPerMeal.breakfast || 0}
        mealTime="breakfast"
      />
      {meals.breakfast.length === 0 ? (
        <NoRecords />
      ) : (
        meals.breakfast.map((meal) => (
          <MealItem
            key={keyGenerator(meal.id)}
            title={meal.main_food_description}
            calories={meal.energy}
          />
        ))
      )}

      <MealHeader
        title="🥘 Lunch"
        calories={energyNeedPerMeal.lunch || 0}
        mealTime="lunch"
      />

      {meals.lunch.length === 0 ? (
        <NoRecords />
      ) : (
        meals.lunch.map((meal) => (
          <MealItem
            key={keyGenerator(meal.id)}
            title={meal.main_food_description}
            calories={meal.energy}
          />
        ))
      )}
      <MealHeader
        title="🍲 Dinner"
        calories={energyNeedPerMeal.dinner || 0}
        mealTime="dinner"
      />
      {meals.dinner.length === 0 ? (
        <NoRecords />
      ) : (
        meals.dinner.map((meal) => (
          <MealItem
            key={keyGenerator(meal.id)}
            title={meal.main_food_description}
            calories={meal.energy}
          />
        ))
      )}
    </View>
  );
};

export default Meals;
