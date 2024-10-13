import AnimatedFloatingButton from "@/src/components/AnimatedFloatingButton";
import ScreenView from "@/src/components/ScreenView";
import useMeals from "@/src/query/hooks/useMeals";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

type DaySummaryProps = {
  startDate: string;
  endDate: string;
};

type Meal = {
  id: string;
  lowResImage: string;
  foodName: string;
  category_description: string;
  main_food_description: string;
};

type Meals = {
  [key in (typeof mealTypes)[number]]: Meal[];
};

const mealTypes = ["breakfast", "lunch", "dinner"] as const;

const MealItem = ({ meal }: { meal: Meal }) => (
  <View key={meal.id} className="mb-2 mt-2 flex flex-row items-center gap-2">
    <Image
      source={{ uri: meal.lowResImage }}
      style={{
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: "#00000030",
        borderRadius: 4,
      }}
    />
    <View className="flex w-4/5 flex-col space-y-1">
      <Text className="text-m font-bold text-black dark:text-white">
        {meal.foodName}
      </Text>
      <Text className="text-xs font-semibold text-gray-800 dark:text-gray-400">
        {meal.category_description}
      </Text>
      <Text
        numberOfLines={2}
        className="text-xs text-gray-800 dark:text-gray-400"
      >
        {meal.main_food_description}
      </Text>
    </View>
  </View>
);

const MealSection = ({
  type,
  meals,
  index,
}: {
  type: string;
  meals: Meal[];
  index: number;
}) => {
  const { colorScheme } = useColorScheme();

  return (
    <Animated.View className="p-0" entering={FadeIn.delay(300 * (index + 1))}>
      <View className="flex flex-col space-y-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <Text className="text-xl font-semibold text-green-500 dark:text-lime-400">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Text>

        <View className="mt-2 flex flex-row items-center gap-2">
          <Ionicons
            name="flame"
            size={18}
            color={colorScheme === "dark" ? "white" : "black"}
          />
          <Text className="text-xl font-semibold dark:text-white">
            {999} <Text className="text-xs dark:text-white">KCal / 1000</Text>
          </Text>
        </View>

        {meals.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </View>
    </Animated.View>
  );
};

const DaySummary = ({ startDate, endDate }: DaySummaryProps) => {
  const { meals } = useMeals({ startDate, endDate }) as { meals: Meals };

  return (
    <View className="flex-1">
      <ScreenView scrollable>
        <View className="gap-2 p-4">
          {mealTypes.map((type, index) => (
            <MealSection
              key={type}
              type={type}
              meals={meals[type]}
              index={index}
            />
          ))}
        </View>
      </ScreenView>
      <AnimatedFloatingButton
        onButtonPress={() => {
          router.push(
            `/aiRecommendation?startDate=${startDate}&endDate=${endDate}`,
          );
        }}
      />
    </View>
  );
};

export default DaySummary;
