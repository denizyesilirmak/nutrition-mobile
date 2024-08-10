import { MEALS_API } from "@/src/constants/Api";
import { Food, Meal } from "@/src/screens/home/types";
import fetchWithToken from "@/src/utils/fetch";
import { useQuery } from "@tanstack/react-query";

const transformMeals = (meals: Meal[]) => {
  if (!meals) {
    return {
      breakfast: [],
      lunch: [],
      dinner: [],
    };
  }

  const categorizedMeals = {
    breakfast: [],
    lunch: [],
    dinner: [],
  } as Record<string, Food[]>;

  meals.forEach((meal) => {
    const { mealTime, food } = meal;

    categorizedMeals[mealTime] = categorizedMeals[mealTime].concat(food);
  });

  return categorizedMeals as Record<string, Food[]>;
};

const fetchMeals = async ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const response = await fetchWithToken(
    `${MEALS_API}?startDate=${startDate}&endDate=${endDate}`,
  );
  const data = await response.json();

  return transformMeals(data);
};

const useMeals = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["meals", "date", endDate],
    queryFn: async () => fetchMeals({ startDate, endDate }),
  });

  return {
    meals: data,
    isError,
    isLoading,
  };
};

export default useMeals;
