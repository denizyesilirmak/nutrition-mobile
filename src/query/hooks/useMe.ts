import { ME_API } from "@/src/constants/Api";
import fetchWithToken from "@/src/utils/fetch";
import { useQuery } from "@tanstack/react-query";

export type Response = {
  token: string;
  status: boolean;
  user: User;
};

export type User = {
  email: string;
  height: number;
  weight: number;
  gender: string;
  age: number;
  nutritionalNeed: NutritionalNeed;
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

  return {
    me: data?.data,
    isLoading,
    isError,
  };
};

export default useMe;
