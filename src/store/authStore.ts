import { create } from "zustand";
import Storage from "../storage";

type AuthStore = {
  token: string | null;
  actions: {
    setToken: (token: string) => void;
    deleteToken: () => void;
  };
};

const getInitialToken = () => {
  const token = Storage.getItem("TOKEN");
  if (token) {
    return token;
  }
  return null;
};

const useAuthStore = create<AuthStore>((set) => ({
  token: getInitialToken(),
  actions: {
    setToken: (token) => {
      set({ token });
      Storage.setItem("TOKEN", token);
    },
    deleteToken: () => {
      set({ token: null });
      Storage.removeItem("TOKEN");
    },
  },
}));

export const useAuth = () =>
  useAuthStore((state) => {
    return {
      token: state.token,
      isLoggedIn: !!state.token,
      setToken: state.actions.setToken,
      deleteToken: state.actions.deleteToken,
    };
  });
