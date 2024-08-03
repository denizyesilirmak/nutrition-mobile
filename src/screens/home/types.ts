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
