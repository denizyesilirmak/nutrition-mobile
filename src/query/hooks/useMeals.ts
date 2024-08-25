import { Food } from "@/src/screens/home/types";
import { fetchMeals } from "@/src/utils/services";
import { useQuery } from "@tanstack/react-query";

type MealList = {
  breakfast: Food[];
  lunch: Food[];
  dinner: Food[];
};

const useMeals = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const { data, isError, isLoading, isRefetching } = useQuery<
    MealList,
    Error,
    MealList,
    [string, string, string]
  >({
    queryKey: ["meals", "date", startDate],
    initialData: {
      breakfast: [],
      lunch: [],
      dinner: [],
    },
    queryFn: async () => fetchMeals({ startDate, endDate }),
  });

  return {
    meals: data,
    isError,
    isLoading,
  };
};

export default useMeals;
