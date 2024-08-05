import { REGISTER_API } from "@/src/constants/Api";
import { useMutation } from "@tanstack/react-query";

type Response = {
  status: boolean;
};

type MutationResponse = {
  data: Response;
};

type useRegisterType = {
  email: string;
  password: string;
  birthDate: string;
  height: number;
  weight: number;
};

const fetchRegister = async ({
  email,
  password,
  birthDate,
  height,
  weight,
}: useRegisterType) => {
  const body = JSON.stringify({ email, password, birthDate, height, weight });
  const response = await fetch(REGISTER_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 409) {
      throw new Error("User already exists");
    }
  }

  return {
    data: data as Response,
  };
};

const useRegister = ({
  email,
  password,
  birthDate,
  height,
  weight,
}: useRegisterType) => {
  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    MutationResponse,
    Error,
    useRegisterType
  >({
    mutationFn: fetchRegister,
    onMutate: async () => {
      //   console.log("onMutate");
    },
    onSuccess: () => {
      //   console.log("onSuccess");
    },
  });

  return {
    register: () => mutate({ email, password, birthDate, height, weight }),
    isPending,
    isSuccess,
    isError,
    error,
  };
};

export default useRegister;
