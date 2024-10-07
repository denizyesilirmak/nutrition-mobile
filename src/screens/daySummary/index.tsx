import AnimatedFloatingButton from "@/src/components/AnimatedFloatingButton";
import useMeals from "@/src/query/hooks/useMeals";
import { Text, View } from "react-native";

type DaySummaryProps = {
  startDate: string;
  endDate: string;
};

const DaySummary = ({ startDate, endDate }: DaySummaryProps) => {
  const { meals } = useMeals({ startDate, endDate });

  return (
    <View className="flex-1">
      <View className="flex-1 p-4">
        <Text className="text-xl font-semibold dark:text-white">
          🍳 Breakfast
        </Text>

        <View>
          {meals.breakfast.map((meal) => (
            <View key={meal.id}>
              <Text className="text-lg dark:text-white">
                {meal.category_description}
              </Text>
            </View>
          ))}
        </View>

        <Text className="text-xl font-semibold dark:text-white">🥪 Lunch</Text>

        <View>
          {meals.lunch.map((meal) => (
            <Text key={meal.id} className="text-lg dark:text-white">
              {meal.category_description}
            </Text>
          ))}
        </View>

        <Text className="text-xl font-semibold dark:text-white">🍲 Dinner</Text>

        <View>
          {meals.dinner.map((meal) => (
            <Text key={meal.id} className="text-lg dark:text-white">
              {meal.category_description}
            </Text>
          ))}
        </View>
      </View>
      <AnimatedFloatingButton />
    </View>
  );
};

export default DaySummary;
