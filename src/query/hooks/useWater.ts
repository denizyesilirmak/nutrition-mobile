import { WATER_API } from "@/src/constants/Api";
import fetchWithToken from "@/src/utils/fetch";
import { useQuery } from "@tanstack/react-query";
import { DailyIntake } from "./useAddWater";

export type ResponseType = {
  date: Date;
  daily_intakes: DailyIntake[];
  daily_total: number;
};

const fetchWater = async ({ date }: { date: string }) => {
  const response = await fetchWithToken(WATER_API + `/${date}`);

  const data = await response.json();

  return data;
};

const useWater = ({ date, amount }: { date: string; amount?: number }) => {
  const { data, isLoading, isError } = useQuery<
    ResponseType,
    Error,
    ResponseType,
    [string]
  >({
    queryKey: ["water"],
    queryFn: () => fetchWater({ date }),
  });

  return { water: data, isLoading, isError };
};

export default useWater;
