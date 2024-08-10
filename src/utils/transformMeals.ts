import { Food, Meal } from "../screens/home/types";

export const transformMeals = (meals: Meal[]) => {
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
