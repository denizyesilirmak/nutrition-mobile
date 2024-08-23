import DailyTips from "@/src/components/DailyTips";
import DatePickerSlider from "@/src/components/DatePickerSlider";
import Meals from "@/src/components/Meals";
import Overview from "@/src/components/Overview";
import ScreenView from "@/src/components/ScreenView";
import WaterOverview from "@/src/components/WaterOverview";
import useMe from "@/src/query/hooks/useMe";
import useMeals from "@/src/query/hooks/useMeals";
import { format } from "date-fns";
import { useState } from "react";
import { Text, View } from "react-native";
import { Food } from "./types";
import { calculateTotalCalories } from "./utils";
import NumberSelector from "@/src/components/NumberSelector";

const Home = () => {
  const today = new Date();
  const dateObj = new Date(today);
  const previousDay = new Date(dateObj.setDate(dateObj.getDate() - 1));

  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: format(previousDay, "yyyy-MM-dd"),
    endDate: format(today, "yyyy-MM-dd"),
  });

  const total = 2400;

  const { meals, isError, isLoading } = useMeals({
    startDate: selectedDateRange.startDate,
    endDate: selectedDateRange.endDate,
  });

  const handleDateChange = (date: Date) => {
    const nextday = new Date(date);
    nextday.setDate(date.getDate() + 1);

    const previousDay = new Date(date);
    previousDay.setDate(date.getDate());

    setSelectedDateRange({
      startDate: format(previousDay, "yyyy-MM-dd"),
      endDate: format(nextday, "yyyy-MM-dd"),
    });
  };

  const totalCalories = calculateTotalCalories(meals as Record<string, Food[]>);

  const { me } = useMe();
  if (!me) return null;

  console.log('home render');

  return (
    <ScreenView scrollable>
      <DatePickerSlider onDateChange={handleDateChange} />
      <View className="p-4 pt-0">
        <Text className="pb-2 text-lg font-bold text-black dark:text-white">
          Overview
        </Text>
        <Overview
          consumedCalories={totalCalories.total.energy}
          total={me?.nutritionalNeed?.calories || total}
          macroNutrients={{
            carbs: totalCalories.total.carbs || 0,
            protein: totalCalories.total.protein || 0,
            fat: totalCalories.total.fat || 0,
          }}
          maximumNutrients={{
            carbs: me?.nutritionalNeed?.carbs || 300,
            protein: me?.nutritionalNeed?.protein || 100,
            fat: me?.nutritionalNeed?.fat || 100,
          }}
        />
        <Text className="pb-2 pt-2 text-lg font-bold text-black dark:text-white">
          Meals
        </Text>
        <Meals
          meals={meals as Record<string, Food[]>}
          energyNeedPerMeal={{
            breakfast: me?.nutritionalNeed?.calories * 0.3 || 0,
            lunch: me?.nutritionalNeed?.calories * 0.4 || 0,
            dinner: me?.nutritionalNeed?.calories * 0.3 || 0,
          }}
        />
        <Text className="pb-2 pt-2 text-lg font-bold text-black dark:text-white">
          Daily Tips
        </Text>
        <DailyTips />
        <Text className="pb-2 pt-2 text-lg font-bold text-black dark:text-white">
          Water Intake
        </Text>
        <WaterOverview />
        <Text className="pb-2 pt-2 text-lg font-bold text-black dark:text-white">
          Weight Update
        </Text>
        <NumberSelector />
      </View>
    </ScreenView>
  );
};

export default Home;
