import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren, useEffect } from "react";
import { AppState, AppStateStatus, Platform } from "react-native";

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}
export const _queryClient = new QueryClient();

export const invalidateQueriesWithDelay = (
  args: Parameters<typeof _queryClient.invalidateQueries>[0],
) => {
  setTimeout(() => {
    _queryClient.invalidateQueries(args);
  }, 1300);
};

export const QueryProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <QueryClientProvider client={_queryClient}>{children}</QueryClientProvider>
  );
};
