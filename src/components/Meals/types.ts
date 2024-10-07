type MealsProps = {
  title: string;
  calories: number;
  mealTime: string;
};

type MealSectionProps = {
  mealType: "breakfast" | "lunch" | "dinner";
  meals: {
    [key: string]: {
      id: string;
      foodName: string;
      energy: number;
      lowResImage: string;
      category_description: string;
    }[];
  };
  energyNeed: number;
  startDate: string;
  endDate: string;
};

export type { MealsProps, MealSectionProps };
