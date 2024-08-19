import { ME_API } from "@/src/constants/Api";
import fetchWithToken from "@/src/utils/fetch";
import { useMutation, useQuery } from "@tanstack/react-query";
import { _queryClient } from "../QueryProvider";

export type Response = {
  token: string;
  status: boolean;
  user: User;
};

export type WeightHistory = {
  createdAt: string;
  id: string;
  newWeight: number;
  oldWeight: number;
};

export type User = {
  email: string;
  height: number;
  weight: number;
  gender: string;
  age: number;
  firstName: string;
  lastName: string;
  nutritionalNeed: NutritionalNeed;
  weightHistory: WeightHistory[];
};

export type NutritionalNeed = {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
};

type QueryResponse = {
  data: User;
  status: number;
};

const fetchMe = async () => {
  const response = await fetchWithToken(ME_API, {
    method: "GET",
  });

  const result = await response.json();

  return {
    data: result as User,
    status: response.status,
  } as Response & { status: number };
};

const fetchUpdateMe = async (user: Partial<User>) => {
  const response = await fetchWithToken(ME_API, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const result = await response.json();

  return {
    data: result as User,
    status: response.status,
  } as Response & { status: number };
};

const useMe = () => {
  const { data, isLoading, isError } = useQuery<
    QueryResponse,
    Error,
    QueryResponse,
    [string]
  >({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

  const {
    isSuccess,
    mutate,
    isError: isUpdateError,
  } = useMutation<Response, Error, Partial<User>, [string]>({
    mutationFn: fetchUpdateMe,
    onSettled: () => {
      // Invalidate the "me" query
      _queryClient.invalidateQueries("me");
    }
  });

  return {
    me: data?.data,
    isLoading,
    isError,
    updateMe: mutate,
    updateError: isUpdateError,
    updateSuccess: isSuccess,
  };
};

export default useMe;
