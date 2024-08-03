import { ME_API } from "@/src/constants/Api";
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
  const response = await fetch(ME_API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ed791dd1-cd1f-433f-bce1-7e2e0c7fbf52`,
    },
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
