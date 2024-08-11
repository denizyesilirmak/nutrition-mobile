import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../../global.css";
import { ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { DarkTheme, LightTheme } from "../constants/Colors";
import { QueryProvider } from "../query/QueryProvider";

const InitialLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <>
      <QueryProvider>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : LightTheme}>
          <StatusBar style="dark" animated />
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="login"
              options={{
                headerShown: true,
                headerTitle: "Login",
                gestureEnabled: false,
                headerBackVisible: false,
              }}
            />
            <Stack.Screen
              name="register"
              options={{
                headerShown: true,
                headerTitle: "Register",
                gestureEnabled: false,
                headerBackVisible: false,
              }}
            />
            <Stack.Screen
              name="onboarding"
              options={{
                headerShown: true,
                headerTitle: "Onboarding",
                gestureEnabled: false,
                headerBackVisible: false,
              }}
            />
            {/* <Stack.Screen name="camera" /> */}
            <Stack.Screen
              name="components"
              options={{
                headerShown: true,
                headerTitle: "Components",
                gestureEnabled: false,
                headerBackVisible: false,
              }}
            />
          </Stack>
        </ThemeProvider>
      </QueryProvider>
    </>
  );
};

export default InitialLayout;
