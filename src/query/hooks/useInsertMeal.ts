import { useMutation } from "@tanstack/react-query";

import { FoodToInsert, insertMeal } from "@/src/utils/services";
import { invalidateQueriesWithDelay } from "../QueryProvider";

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
      invalidateQueriesWithDelay({
        queryKey: ["meals"],
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
