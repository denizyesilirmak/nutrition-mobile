import { Image, Text, View } from "react-native";
import ChartCircle from "../ChartCircle";
import ChartLine from "../ChartLine";
import useMeals from "@/src/query/hooks/useMeals";
import { calculateTotalCalories } from "@/src/screens/home/utils";
import { Food } from "@/src/screens/home/types";
import useMe from "@/src/query/hooks/useMe";
import { cn } from "@/src/utils/cn";

import CarbsIcon from "@/src/assets/icons/carb.png";
import FatIcon from "@/src/assets/icons/fat.png";
import ProteinIcon from "@/src/assets/icons/protein.png";
import { IconColors } from "@/src/constants/Colors";

type OverviewProps = {
  startDate: string;
  endDate: string;
};

const Overview = ({ startDate, endDate }: OverviewProps) => {
  const { meals } = useMeals({
    startDate,
    endDate,
  });

  const { me } = useMe();

  const totalCalories = calculateTotalCalories(meals as Record<string, Food[]>);

  const total = me?.nutritionalNeed?.calories || 2400;
  const consumedCalories = totalCalories.total.energy;
  const macroNutrients = {
    carbs: totalCalories.total.carbs || 0,
    protein: totalCalories.total.protein || 0,
    fat: totalCalories.total.fat || 0,
  };

  const maximumNutrients = {
    carbs: me?.nutritionalNeed?.carbs || 300,
    protein: me?.nutritionalNeed?.protein || 100,
    fat: me?.nutritionalNeed?.fat || 100,
  };

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
          <Text
            className={cn(
              "text-black-400 text-lg font-bold dark:text-gray-100",
              {
                "text-red-500": total < consumedCalories,
              },
            )}
          >
            {Math.abs(total - consumedCalories)}
            <Text className="text-sm font-normal"> kcal</Text>
          </Text>
          <Text
            className={cn("text-sm font-semibold", {
              "text-gray-400 dark:text-gray-300": total >= consumedCalories,
              "text-red-500": total < consumedCalories,
            })}
          >
            {total > consumedCalories ? "Remaining" : "Exceeded"}
          </Text>
        </View>
      </View>
      <View className="h-20 w-full flex-row bg-gray-100 dark:bg-gray-700">
        <View className="h-full flex-1 items-center justify-center">
          <View className="flex-row items-center">
            <Image
              source={CarbsIcon}
              className="mr-1 h-6 w-6"
              tintColor={IconColors.carbonhydrate}
            />
            <Text className="text-black-400 text-sm font-semibold dark:text-gray-100">
              Carbs
            </Text>
          </View>
          <Text className="text-black-400 text-sm font-semibold dark:text-gray-100">
            {macroNutrients.carbs.toFixed(1)} gr /{" "}
            <Text className="text-xs text-gray-400 dark:text-gray-300">
              {maximumNutrients.carbs} gr
            </Text>
          </Text>
          <ChartLine value={macroNutrients.carbs / maximumNutrients.carbs} />
        </View>

        <View className="h-full flex-1 items-center justify-center">
          <View className="flex-row items-center">
            <Image
              source={ProteinIcon}
              className="mr-1 h-6 w-6"
              tintColor={IconColors.protein}
            />
            <Text className="text-black-400 text-sm font-semibold dark:text-gray-100">
              Protein
            </Text>
          </View>
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
          <View className="flex-row items-center">
            <Image
              source={FatIcon}
              className="mr-1 h-6 w-6"
              tintColor={IconColors.fat}
            />
            <Text className="text-black-400 text-sm font-semibold dark:text-gray-100">
              Fat
            </Text>
          </View>
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
