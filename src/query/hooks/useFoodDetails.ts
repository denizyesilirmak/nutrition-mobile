import { FOOD_DETAILS_API } from "@/src/constants/Api";
import { useQuery } from "@tanstack/react-query";

export interface FoodDetailsType {
  alcohol: number;
  caffeine: number;
  calcium: number;
  carbohydrate: number;
  category_description: string;
  cholesterol: number;
  energy: number;
  fatty_acids: number;
  fiber_total: number;
  foodName: string;
  food_code: number;
  highResImage: string;
  imageName: string;
  iron: number;
  lowResImage: string;
  magnesium: number;
  main_food_description: string;
  multiplier: number;
  phosphorus: number;
  potassium: number;
  protein: number;
  selenium: number;
  sodium: number;
  sugars_total: number;
  total_fat: number;
  vitamin_a: number;
  vitamin_b_12: number;
  vitamin_c: number;
  vitamin_d: number;
  vitamin_e: number;
  vitamin_k: number;
  water: number;
  wweia_category_number: number;
  zinc: number;
}

const fetchFoodDetails = async (foodId: string | undefined) => {
  if (!foodId) {
    throw new Error("No foodId provided");
  }

  const response = await fetch(`${FOOD_DETAILS_API}/${foodId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const useFoodDetails = (foodId: string | undefined) => {
  const { data, error, isLoading } = useQuery<
    FoodDetailsType,
    Error,
    FoodDetailsType
  >({
    queryKey: ["foodDetails", foodId],
    queryFn: () => fetchFoodDetails(foodId),
  });

  return {
    foodDetails: data,
    error,
    isLoading,
  };
};

export default useFoodDetails;
