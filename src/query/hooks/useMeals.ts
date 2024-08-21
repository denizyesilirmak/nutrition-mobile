import { fetchMeals } from "@/src/utils/services";
import { useQuery } from "@tanstack/react-query";

const useMeals = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["meals", "date", startDate],
    queryFn: async () => fetchMeals({ startDate, endDate }),
  });

  return {
    meals: data,
    isError,
    isLoading,
  };
};

export default useMeals;
