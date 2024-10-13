import useMe from "@/src/query/hooks/useMe";
import useMeals from "@/src/query/hooks/useMeals";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import IconButton from "../IconButton";
import { MealSectionProps, MealsProps } from "./types";

const MAX_RECORDS_TO_SHOW = 3;

const MealHeader = ({ title, calories, mealTime }: MealsProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex flex-row items-center justify-between rounded-lg bg-gray-100 px-2 dark:bg-gray-700">
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

type MealItemProps = {
  title: string;
  calories: number;
  image: string;
  description: string;
  onPress: () => void;
};

const MealItem = ({
  title,
  calories,
  image,
  description,
  onPress,
}: MealItemProps) => {
  const MemorizedImage = useMemo(() => Image, []);

  return (
    <Pressable
      onPress={onPress}
      className="flex flex-row items-center justify-between px-4 py-3"
    >
      <View className="flex-1 flex-row items-center">
        <MemorizedImage
          source={{ uri: image }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "#00000030",
            marginRight: 8,
          }}
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
    </Pressable>
  );
};

const NoRecords = () => (
  <View className="flex flex-col justify-center px-4 py-3">
    <Text className="text-black-400 text-md dark:text-gray-100">
      No records found
    </Text>
  </View>
);

const MoreRecords = ({ count }: { count: number }) => (
  <View className="mb-2 flex flex-col justify-center rounded-lg bg-gray-100 px-4 py-3 opacity-50 dark:bg-gray-700">
    <Text className="text-black-400 text-md dark:text-gray-100">
      +{count} more records
    </Text>
  </View>
);

const MealSection = ({
  mealType,
  meals,
  energyNeed,
  startDate,
  endDate,
}: MealSectionProps) => {
  const mealIcons = {
    breakfast: "🥞 Breakfast",
    lunch: "🥘 Lunch",
    dinner: "🍲 Dinner",
  };

  const mealData = meals[mealType] || [];

  return (
    <>
      <MealHeader
        title={mealIcons[mealType]}
        calories={energyNeed}
        mealTime={mealType}
      />
      {mealData.length === 0 ? (
        <NoRecords />
      ) : (
        mealData
          .sort((a, b) => b.energy - a.energy)
          .slice(0, MAX_RECORDS_TO_SHOW)
          .map((meal) => (
            <MealItem
              key={meal.id}
              title={meal.foodName}
              calories={meal.energy}
              image={meal.lowResImage}
              description={meal.category_description}
              onPress={() => {
                router.push(
                  `/daySummary?startDate=${startDate}&endDate=${endDate}`,
                );
              }}
            />
          ))
      )}
      {mealData.length > MAX_RECORDS_TO_SHOW && (
        <MoreRecords count={mealData.length - MAX_RECORDS_TO_SHOW} />
      )}
    </>
  );
};

const Meals = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const { meals } = useMeals({
    startDate,
    endDate,
  });

  const { me } = useMe();

  if (!me) {
    return null;
  }

  const totalCalories = me.nutritionalNeed?.calories || 0;
  const energyNeedPerMeal = {
    breakfast: totalCalories * 0.3,
    lunch: totalCalories * 0.4,
    dinner: totalCalories * 0.3,
  };

  const mealTypes = ["breakfast", "lunch", "dinner"] as const;

  return (
    <View className="overflow-hidden rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
      {mealTypes.map((mealType) => (
        <MealSection
          key={mealType}
          mealType={mealType}
          meals={meals || { [mealType]: [] }}
          energyNeed={energyNeedPerMeal[mealType]}
          startDate={startDate}
          endDate={endDate}
        />
      ))}
    </View>
  );
};

export default Meals;
