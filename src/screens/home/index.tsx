import DailyTips from "@/src/components/DailyTips";
import DatePickerSlider from "@/src/components/DatePickerSlider";
import Meals from "@/src/components/Meals";
import Overview from "@/src/components/Overview";
import ScreenView from "@/src/components/ScreenView";
import WaterOverview from "@/src/components/WaterOverview";
import { MEALS_API } from "@/src/constants/Api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export type Meal = {
  food: Food[];
  created_at: string;
  mealTime: string;
};

export type Food = {
  id: string;
  alcohol: number;
  caffeine: number;
  calcium: number;
  carbohydrate: number;
  category_description: string;
  cholesterol: number;
  energy: number;
  fatty_acids: number;
  fiber_total: number;
  food_code: number;
  iron: number;
  magnesium: number;
  main_food_description: string;
  phosphorus: number;
  potassium: number;
  protein: number;
  selenium: number;
  sodium: number;
  sugars_total: number;
  total_fat: number;
  vitamin_a: number;
  vitamin_b_12: number;
  "vitamin_c ": number;
  vitamin_d: number;
  vitamin_e: number;
  vitamin_k: number;
  water: number;
  wweia_category_number: number;
  zinc: number;
};

const calculateTotalCalories = (data: Record<string, Food[] | undefined>) => {
  if (!data) {
    return {
      total: {
        energy: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
      },
      breakfast: {
        energy: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
      },
      lunch: {
        energy: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
      },
      dinner: {
        energy: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
      },
    };
  }

  const total = {
    energy: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
  };

  const breakfast = {
    energy: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
  };

  const lunch = {
    energy: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
  };

  const dinner = {
    energy: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
  };

  Object.keys(data).forEach((key) => {
    if (!data[key]) {
      return {
        total: {
          energy: 0,
          carbs: 0,
          protein: 0,
          fat: 0,
        },
        breakfast: {
          energy: 0,
          carbs: 0,
          protein: 0,
          fat: 0,
        },
        lunch: {
          energy: 0,
          carbs: 0,
          protein: 0,
          fat: 0,
        },
        dinner: {
          energy: 0,
          carbs: 0,
          protein: 0,
          fat: 0,
        },
      };
    }

    data[key].forEach((food) => {
      total.energy += food.energy;
      total.carbs += food.carbohydrate;
      total.protein += food.protein;
      total.fat += food.total_fat;

      if (key === "breakfast") {
        breakfast.energy += food.energy;
        breakfast.carbs += food.carbohydrate;
        breakfast.protein += food.protein;
        breakfast.fat += food.total_fat;
      } else if (key === "lunch") {
        lunch.energy += food.energy;
        lunch.carbs += food.carbohydrate;
        lunch.protein += food.protein;
        lunch.fat += food.total_fat;
      } else if (key === "dinner") {
        dinner.energy += food.energy;
        dinner.carbs += food.carbohydrate;
        dinner.protein += food.protein;
        dinner.fat += food.total_fat;
      }
    });
  });

  return {
    total,
    breakfast,
    lunch,
    dinner,
  };
};

const Home = () => {
  const today = new Date();
  const dateObj = new Date(today);
  const previosDay = new Date(dateObj.setDate(dateObj.getDate() - 1));

  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: format(previosDay, "yyyy-MM-dd"),
    endDate: format(today, "yyyy-MM-dd"),
  });

  const total = 2400;

  const { data } = useQuery({
    queryKey: ["meals", "date", selectedDateRange.endDate],
    queryFn: async () => {
      const response = await fetch(
        `${MEALS_API}?startDate=${selectedDateRange.startDate}&endDate=${selectedDateRange.endDate}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer ed791dd1-cd1f-433f-bce1-7e2e0c7fbf52",
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

  const totalCalories = calculateTotalCalories(data);

  return (
    <ScreenView scrollable>
      <DatePickerSlider onDateChange={handleDateChange} />
      <View className="p-4 pt-0">
        <Text className="text-lg font-bold text-black dark:text-white">
          Overview
        </Text>
        <Overview
          consumedCalories={totalCalories.total.energy}
          total={total}
          macroNutrients={{
            carbs: totalCalories.total.carbs,
            protein: totalCalories.total.protein,
            fat: totalCalories.total.fat,
          }}
          maximumNutrients={{
            carbs: 300,
            protein: 200,
            fat: 100,
          }}
        />
        <Text className="pt-2 text-lg font-bold text-black dark:text-white">
          Meals
        </Text>
        <Meals meals={data as Record<string, Food[]>} />
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
