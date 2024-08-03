import { Food } from "./types";

export const calculateTotalCalories = (
  data: Record<string, Food[] | undefined>,
) => {
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
