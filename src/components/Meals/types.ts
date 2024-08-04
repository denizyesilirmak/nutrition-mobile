import { Food } from "@/src/screens/home/types";

type MealsProps = {
  meals: Record<string, Food[]>;
  energyNeedPerMeal: {
    breakfast?: number;
    lunch?: number;
    dinner?: number;
  };
};

export { type MealsProps };
