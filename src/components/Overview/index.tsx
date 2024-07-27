import { Text, View } from "react-native";
import ChartCircle from "../ChartCircle";
import ChartLine from "../ChartLine";

type OverviewProps = {
  consumedCalories: number;
  total: number;
  macroNutrients: {
    carbs: number;
    protein: number;
    fat: number;
  };
  maximumNutrients: {
    carbs: number;
    protein: number;
    fat: number;
  };
};

const Overview = ({
  consumedCalories,
  total,
  macroNutrients,
  maximumNutrients,
}: OverviewProps) => {
  return (
    <View className="overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800">
      <View className="flex-row justify-between">
        <View className="flex w-1/3 flex-col items-center justify-center">
          <Text className="text-black-400 text-lg font-bold dark:text-gray-100">
            {total} <Text className="text-sm font-normal">kcal</Text>
          </Text>
          <Text className="text-sm font-semibold text-gray-400 dark:text-gray-300">
            Total
          </Text>
        </View>
        <ChartCircle calorie={consumedCalories} total={total} />
        <View className="flex w-1/3 flex-col items-center justify-center">
          <Text className="text-black-400 text-lg font-bold dark:text-gray-100">
            {total - consumedCalories}
            <Text className="text-sm font-normal"> kcal</Text>
          </Text>
          <Text className="text-sm font-semibold text-gray-400 dark:text-gray-300">
            Remaining
          </Text>
        </View>
      </View>
      <View className="h-20 w-full flex-row bg-gray-100 dark:bg-gray-700">
        <View className="h-full flex-1 items-center justify-center">
          <Text className="text-black-400 text-sm font-semibold dark:text-gray-100">
            Carbs
          </Text>
          <Text className="text-black-400 text-sm font-semibold dark:text-gray-100">
            {macroNutrients.carbs.toFixed(1)} gr /{" "}
            <Text className="text-xs text-gray-400 dark:text-gray-300">
              {maximumNutrients.carbs} gr
            </Text>
          </Text>
          <ChartLine value={macroNutrients.carbs / maximumNutrients.carbs} />
        </View>

        <View className="h-full flex-1 items-center justify-center">
          <Text className="text-black-400 text-sm font-semibold dark:text-gray-100">
            Protein
          </Text>
          <Text className="text-black-400 text-sm font-semibold dark:text-gray-100">
            {macroNutrients.protein.toFixed(1)} gr /{" "}
            <Text className="text-xs text-gray-400 dark:text-gray-300">
              {maximumNutrients.protein} gr
            </Text>
          </Text>
          <ChartLine
            value={macroNutrients.protein / maximumNutrients.protein}
          />
        </View>

        <View className="h-full flex-1 items-center justify-center">
          <Text className="text-black-400 text-sm font-semibold dark:text-gray-100">
            Fat
          </Text>
          <Text className="text-black-400 text-sm font-semibold dark:text-gray-100">
            {macroNutrients.fat.toFixed(1)} gr /{" "}
            <Text className="text-xs text-gray-400 dark:text-gray-300">
              {maximumNutrients.fat} gr
            </Text>
          </Text>
          <ChartLine value={macroNutrients.fat / maximumNutrients.fat} />
        </View>
      </View>
    </View>
  );
};

export default Overview;
