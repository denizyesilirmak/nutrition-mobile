import { Food } from "@/src/screens/home/types";

type MealsProps = {
  meals: Record<string, Food[]>;
  startDate: string;
  endDate: string;
};

export { type MealsProps };
