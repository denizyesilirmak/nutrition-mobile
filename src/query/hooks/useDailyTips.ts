import {
  DailyTip,
  DailyTipResponse,
  fetchDailyTips,
} from "@/src/utils/services";
import { useQuery } from "@tanstack/react-query";

const useDailyTips = () => {
  const { data, isLoading, isError, error } = useQuery<
    DailyTipResponse,
    Error,
    DailyTip[],
    string[]
  >({
    queryKey: ["dailyTips"],
    queryFn: fetchDailyTips,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return {
    tips: data ? data : [],
    isLoading,
    isError,
    error,
  };
};

export default useDailyTips;
