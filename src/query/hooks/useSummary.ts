import { fetchSummary } from "@/src/utils/services";
import { useQuery } from "@tanstack/react-query";

const useSummary = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["summary", startDate, endDate],
    queryFn: () => fetchSummary(startDate, endDate),
    //never cache the summary
    staleTime: 0,
  });

  const summaryObject = data?.reduce((acc: any, item: any) => {
    acc[item.date] = item;
    return acc;
  }, {});

  return { summary: summaryObject, error, isLoading };
};

export default useSummary;
