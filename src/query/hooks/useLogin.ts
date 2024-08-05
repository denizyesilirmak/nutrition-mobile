import { LOGIN_API } from "@/src/constants/Api";
import { useMutation } from "@tanstack/react-query";

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

type MutationResponse = {
  data: Response;
};

const fetchLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const body = JSON.stringify({ email, password });
  const response = await fetch(LOGIN_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();

  return {
    data: data,
    status: response.status,
  } as Response & { status: number };
};

export const useLogin = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { mutate, isError, isPending, isSuccess } = useMutation<
    MutationResponse,
    Error,
    { email: string; password: string }
  >({
    mutationFn: fetchLogin,
    onMutate: () => {
      // console.log("[Login] onMutate");
    },
    onSuccess: (loginData) => {
      // console.log("[Login] onSuccess:", loginData.data.user.nutritionalNeed);
    },
  });

  return {
    login: () => mutate({ email, password }),
    isError,
    isPending,
    isSuccess,
  };
};
