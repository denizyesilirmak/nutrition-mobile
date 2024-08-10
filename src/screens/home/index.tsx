import DailyTips from "@/src/components/DailyTips";
import DatePickerSlider from "@/src/components/DatePickerSlider";
import Meals from "@/src/components/Meals";
import Overview from "@/src/components/Overview";
import ScreenView from "@/src/components/ScreenView";
import WaterOverview from "@/src/components/WaterOverview";
import { MEALS_API } from "@/src/constants/Api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { Text, View } from "react-native";
import { calculateTotalCalories } from "./utils";
import { Food, Meal } from "./types";
import useMe from "@/src/query/hooks/useMe";
import Storage from "@/src/storage";

const Home = () => {
  const today = new Date();
  const dateObj = new Date(today);
  const previosDay = new Date(dateObj.setDate(dateObj.getDate() - 1));

  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: format(previosDay, "yyyy-MM-dd"),
    endDate: format(today, "yyyy-MM-dd"),
  });

  const total = 2400;

  const TOKEN_TEMP = Storage.getItem("TOKEN");

  const { data } = useQuery({
    queryKey: ["meals", "date", selectedDateRange.endDate],
    queryFn: async () => {
      const response = await fetch(
        `${MEALS_API}?startDate=${selectedDateRange.startDate}&endDate=${selectedDateRange.endDate}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN_TEMP}`,
          },
        },
      );
      const data = await response.json();

      return transformMeals(data);
    },
  });

  const transformMeals = (meals: Meal[]) => {
    if (!meals) {
      return {
        breakfast: [],
        lunch: [],
        dinner: [],
      };
    }

    const categorizedMeals = {
      breakfast: [],
      lunch: [],
      dinner: [],
    } as Record<string, Food[]>;

    meals.forEach((meal) => {
      const { mealTime, food } = meal;

      categorizedMeals[mealTime] = categorizedMeals[mealTime].concat(food);
    });

    return categorizedMeals as Record<string, Food[]>;
  };

  const handleDateChange = (date: Date) => {
    const nextday = new Date(date);
    nextday.setDate(date.getDate() + 1);

    const previosDay = new Date(date);
    previosDay.setDate(date.getDate() - 1);

    setSelectedDateRange({
      startDate: format(previosDay, "yyyy-MM-dd"),
      endDate: format(nextday, "yyyy-MM-dd"),
    });
  };

  const totalCalories = calculateTotalCalories(data as Record<string, Food[]>);

  const { me } = useMe();
  if (!me) return null;

  return (
    <ScreenView scrollable>
      <DatePickerSlider onDateChange={handleDateChange} />
      <View className="p-4 pt-0">
        <Text className="text-lg font-bold text-black dark:text-white">
          Overview
        </Text>
        <Overview
          consumedCalories={totalCalories.total.energy}
          total={me?.nutritionalNeed.calories || total}
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
        <Text className="pt-2 text-lg font-bold text-black dark:text-white">
          Meals
        </Text>
        <Meals
          meals={data as Record<string, Food[]>}
          energyNeedPerMeal={{
            breakfast: me?.nutritionalNeed.calories * 0.3 || 0,
            lunch: me?.nutritionalNeed.calories * 0.4 || 0,
            dinner: me?.nutritionalNeed.calories * 0.3 || 0,
          }}
        />
        <Text className="pt-2 text-lg font-bold text-black dark:text-white">
          Daily Tips
        </Text>
        <DailyTips />
        <Text className="pt-2 text-lg font-bold text-black dark:text-white">
          Water Intake
        </Text>
        <WaterOverview full={8} consumed={3} />
      </View>
    </ScreenView>
  );
};

export default Home;
