export interface NutritionList {
  food: Food[];
  id: string;
  createdAt: Date;
  mealTime: MealTime;
}

export interface Food {
  id: string;
  multiplier: number;
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
  food_code: number | string;
  highResImage: string;
  imageName: string;
  iron: number;
  lowResImage: string;
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
  vitamin_c: number;
  vitamin_d: number;
  vitamin_e: number;
  vitamin_k: number;
  water: number;
  wweia_category_number: number;
  zinc: number;
}

export enum MealTime {
  Breakfast = "breakfast",
  Dinner = "dinner",
  Lunch = "lunch",
}
