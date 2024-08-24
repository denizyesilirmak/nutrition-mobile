import { Ionicons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import IconButton from "../IconButton";
import { MealsProps } from "./types";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import useMeals from "@/src/query/hooks/useMeals";
import useMe from "@/src/query/hooks/useMe";

const MAX_RECORDS_TO_SHOW = 3;

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

const MealItem = ({
  title,
  calories,
  image,
  description,
}: {
  title: string;
  calories: number;
  image: string;
  description?: string;
}) => {
  return (
    <Animated.View
      entering={FadeInLeft}
      className="flex flex-row items-center justify-between px-4 py-3"
    >
      <View className="flex-1 flex-row items-center">
        <Image
          source={{ uri: image }}
          className="mr-2 h-12 w-12 rounded-lg border border-lime-500 dark:border-green-500"
        />
        <View className="flex-1">
          <Text
            className="text-black-400 text-md w-3/4 font-semibold dark:text-gray-100"
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text
            className="text-xs text-gray-400 dark:text-gray-300"
            numberOfLines={1}
          >
            {description}
          </Text>
        </View>
      </View>
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

const MoreRecords = ({ count }: { count: number }) => {
  return (
    <View className="mb-2 flex flex-col justify-center rounded-lg bg-gray-100 px-4 py-3 opacity-50 dark:bg-gray-700">
      <Text className="text-black-400 text-md dark:text-gray-100">
        +{count} more records
      </Text>
    </View>
  );
};

const keyGenerator = (id: string) => {
  return id + Math.random().toString();
};

const Meals = ({ startDate, endDate }: MealsProps) => {
  const { meals } = useMeals({
    startDate,
    endDate,
  });

  const { me } = useMe();

  if (!me) {
    return null;
  }

  const energyNeedPerMeal = {
    breakfast: me!.nutritionalNeed!.calories * 0.3,
    lunch: me!.nutritionalNeed!.calories * 0.4,
    dinner: me!.nutritionalNeed!.calories * 0.3,
  };

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
        meals.breakfast
          .sort((a, b) => b.energy - a.energy)
          .slice(0, MAX_RECORDS_TO_SHOW)
          .map((meal) => (
            <MealItem
              key={keyGenerator(meal.id)}
              title={meal.foodName}
              calories={meal.energy}
              image={meal.lowResImage}
              description={meal.category_description}
            />
          ))
      )}

      {meals.breakfast.length > MAX_RECORDS_TO_SHOW && (
        <MoreRecords count={meals.breakfast.length - MAX_RECORDS_TO_SHOW} />
      )}

      <MealHeader
        title="🥘 Lunch"
        calories={energyNeedPerMeal.lunch || 0}
        mealTime="lunch"
      />

      {meals.lunch.length === 0 ? (
        <NoRecords />
      ) : (
        meals.lunch
          .sort((a, b) => b.energy - a.energy)
          .slice(0, MAX_RECORDS_TO_SHOW)
          .map((meal) => (
            <MealItem
              key={keyGenerator(meal.id)}
              title={meal.foodName}
              calories={meal.energy}
              image={meal.lowResImage}
              description={meal.category_description}
            />
          ))
      )}

      {meals.lunch.length > MAX_RECORDS_TO_SHOW && (
        <MoreRecords count={meals.lunch.length - MAX_RECORDS_TO_SHOW} />
      )}

      <MealHeader
        title="🍲 Dinner"
        calories={energyNeedPerMeal.dinner || 0}
        mealTime="dinner"
      />
      {meals.dinner.length === 0 ? (
        <NoRecords />
      ) : (
        meals.dinner
          .sort((a, b) => b.energy - a.energy)
          .slice(0, MAX_RECORDS_TO_SHOW)
          .map((meal) => (
            <MealItem
              key={keyGenerator(meal.id)}
              title={meal.foodName}
              calories={meal.energy}
              image={meal.lowResImage}
              description={meal.category_description}
            />
          ))
      )}

      {meals.dinner.length > MAX_RECORDS_TO_SHOW && (
        <MoreRecords count={meals.dinner.length - MAX_RECORDS_TO_SHOW} />
      )}
    </View>
  );
};

export default Meals;
