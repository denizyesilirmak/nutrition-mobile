import { create } from "zustand";

let lastDetectedAt = 0;
const detectionThrottle = 300;

type DetectedFood = {
  label: string;
  confidence: number;
};

type FoodDetectSession = {
  detectedFoods: { [key: string]: number };
  actions: {
    add: (foodOrFoodArr: DetectedFood | DetectedFood[]) => void;
    reset: () => void;
  };
};

const useFoodDetectSession = create<FoodDetectSession>()((set) => ({
  detectedFoods: {},
  actions: {
    add: (foodOrFoodArr) => {
      if (Date.now() - lastDetectedAt < detectionThrottle) {
        return;
      }
      lastDetectedAt = Date.now();

      let foodArr: DetectedFood[] = [];

      if (!Array.isArray(foodOrFoodArr)) {
        foodArr = [foodOrFoodArr];
      } else {
        foodArr = foodOrFoodArr;
      }

      set((state) => {
        const newDetectedFoods = { ...state.detectedFoods };

        foodArr.forEach((food) => {
          newDetectedFoods[food.label] = food.confidence;
        });

        return { detectedFoods: newDetectedFoods };
      });
    },
    reset: () => {
      set({ detectedFoods: {} });
    },
  },
}));

export const useFoodDetectSessionActions = () =>
  useFoodDetectSession((state) => state.actions);

export const useDetectedFoods = () =>
  useFoodDetectSession((state) => state.detectedFoods);
