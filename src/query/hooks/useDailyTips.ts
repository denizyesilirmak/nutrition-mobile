import { DAILY_TIPS_API } from "@/src/constants/Api";
import { useQuery } from "@tanstack/react-query";

type DailyTip = {
  id: number;
  title: string;
  content: string;
  image: string;
};

type Response = {
  data: DailyTip[];
};

const fetchDailyTips = async () => {
  const response = await fetch(DAILY_TIPS_API);
  const data = await response.json();

  return data;
};

const useDailyTips = () => {
  const { data, isLoading, isError, error } = useQuery<
    Response,
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
