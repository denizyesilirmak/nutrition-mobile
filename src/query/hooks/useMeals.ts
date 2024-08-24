import { fetchMeals } from "@/src/utils/services";
import { useQuery } from "@tanstack/react-query";

const useMeals = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const { data, isError, isLoading, isRefetching } = useQuery({
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
