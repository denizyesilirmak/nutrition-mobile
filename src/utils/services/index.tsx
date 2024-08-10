import { DAILY_TIPS_API, FOOD_SEARCH_API } from "@/src/constants/Api";
import fetchWithToken from "../fetch";

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

  const response = await fetchWithToken(
    `${FOOD_SEARCH_API}?query=${searchTerm.toLowerCase()}&page=${page}&limit=20`,
  );

  const data = (await response.json()) as PageResponse;

  return {
    data: data.data,
    page: data.page,
  };
};
