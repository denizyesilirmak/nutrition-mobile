import { useMutation } from "@tanstack/react-query";

import { FoodToInsert, insertMeal } from "@/src/utils/services";
import { _queryClient } from "../QueryProvider";
import { format } from "date-fns";

type MutationResponse = {
  status: boolean;
  payload: {
    id: string;
  };
};

const useInsertMeal = ({
  foods,
  mealTime,
}: {
  foods: FoodToInsert[];
  mealTime: string;
}) => {
  const { mutate, isPending, isSuccess } = useMutation<
    MutationResponse,
    Error,
    {
      foods: any;
      mealTime: string;
    }
  >({
    mutationFn: insertMeal,
    onError: (error) => {
      console.error("Error inserting meal:", error);
    },
    onSuccess: () => {
      console.log("Meal inserted successfully");
    },
    onSettled: () => {
      _queryClient.invalidateQueries({
        queryKey: ["meals", "date", format(new Date(), "yyyy-MM-dd")],
      });
    },
  });

  return {
    insertMeal: () => mutate({ foods, mealTime }),
    isPending,
    isSuccess,
  };
};

export default useInsertMeal;
