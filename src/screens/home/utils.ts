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
      total.energy += food.energy || 0;
      total.carbs += food.carbohydrate || 0;
      total.protein += food.protein || 0;
      total.fat += food.total_fat || 0;

      if (key === "breakfast") {
        breakfast.energy += food.energy || 0;
        breakfast.carbs += food.carbohydrate || 0;
        breakfast.protein += food.protein || 0;
        breakfast.fat += food.total_fat || 0;
      } else if (key === "lunch") {
        lunch.energy += food.energy || 0;
        lunch.carbs += food.carbohydrate || 0;
        lunch.protein += food.protein || 0;
        lunch.fat += food.total_fat || 0;
      } else if (key === "dinner") {
        dinner.energy += food.energy || 0;
        dinner.carbs += food.carbohydrate || 0;
        dinner.protein += food.protein || 0;
        dinner.fat += food.total_fat || 0;
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
