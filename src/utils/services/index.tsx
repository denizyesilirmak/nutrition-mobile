import {
  AI_RECOMMENDATION_API,
  DAILY_TIPS_API,
  FOOD_SEARCH_API,
  INSERT_MEAL_API,
  MEALS_API,
  SUMMARY_API,
} from "@/src/constants/Api";
import fetchWithToken from "../fetch";
import { transformMeals } from "../transformMeals";

// -----DAILY TIPS API-----

export type DailyTip = {
  id: number;
  title: string;
  content: string;
  image: string;
};

export type DailyTipResponse = {
  data: DailyTip[];
};

export const fetchDailyTips = async () => {
  const response = await fetchWithToken(DAILY_TIPS_API);
  const data = await response.json();

  return data;
};

//----FOOD SEARCH API----

export interface PageResponse {
  data: Food[];
  page: number;
}

export interface Food {
  carbonhydrate: number;
  protein: number;
  fat: number;
  energy: number;
  name: string;
  id: string;
  image: string;
}

export const fetchFoodSearch = async ({
  searchTerm,
  page,
}: {
  searchTerm: string;
  page: any;
}) => {
  if (!searchTerm) {
    return {
      data: [],
      page: 1,
    };
  }

  console.log("Search request for", searchTerm, "page", page);

  const response = await fetchWithToken(
    `${FOOD_SEARCH_API}?query=${searchTerm.toLowerCase()}&page=${page}&limit=20`,
  );

  const data = (await response.json()) as PageResponse;

  return {
    data: data.data,
    page: data.page,
  };
};

// Get Meals

export const fetchMeals = async ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}): Promise<any> => {
  const response = await fetchWithToken(
    `${MEALS_API}?startDate=${startDate}&endDate=${endDate}`,
  );
  const data = await response.json();
  return transformMeals(data);
};

//Insert Meal

export type FoodToInsert = {
  id: string;
  multiplier?: number;
};

export const insertMeal = async ({
  mealTime,
  foods,
}: {
  mealTime: string;
  foods: FoodToInsert[];
}) => {
  const body = {
    mealTime,
    food: foods,
  };

  const response = await fetchWithToken(INSERT_MEAL_API, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
};

// Get Summary

export const fetchSummary = async (startDate: string, endDate: string) => {
  const response = await fetchWithToken(
    `${SUMMARY_API}?startDate=${startDate}&endDate=${endDate}`,
  );
  const data = await response.json();
  return data;
};

// AI Recommendation

export const fetchAiRecommendation = async (date: string) => {
  const response = await fetchWithToken(
    `${AI_RECOMMENDATION_API}?date=${date}`,
  );
  const data = await response.json();
  return data;
};
