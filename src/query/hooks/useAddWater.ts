import { WATER_API } from "@/src/constants/Api";
import fetchWithToken from "@/src/utils/fetch";
import { useMutation } from "@tanstack/react-query";

export type ResponseType = {
  date: Date;
  daily_intakes: DailyIntake[];
  daily_total: number;
};

export type DailyIntake = {
  createdAt: Date;
  ml?: number;
};

const fetchAddWater = async ({
  amount,
}: {
  amount: number;
}): Promise<ResponseType> => {
  const body = JSON.stringify({ ml: amount });

  const response = await fetchWithToken(WATER_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();

  return data;
};

const useAddWater = () => {
  const { data, error, mutate } = useMutation<
    ResponseType,
    unknown,
    number,
    unknown
  >({
    mutationFn: (amount: number) => fetchAddWater({ amount }),

    onMutate: async (amount) => {},

    onError: (error, amount, context) => {},

    onSuccess: (data, amount, context) => {},

    onSettled: (data, error, amount, context) => {
        
    },
  });

  return { data, error, mutate };
};

export default useAddWater;
