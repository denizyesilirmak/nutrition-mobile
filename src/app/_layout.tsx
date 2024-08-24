import { Stack } from "expo-router";
import "../../global.css";
import { ThemeProvider } from "@react-navigation/native";
import { DarkTheme, LightTheme } from "../constants/Colors";
import { QueryProvider } from "../query/QueryProvider";
import { useColorScheme } from "nativewind";
import { StatusBar } from "react-native";

const InitialLayout = () => {
  const { colorScheme } = useColorScheme();

  return (
    <>
      <QueryProvider>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : LightTheme}>
          <StatusBar
            barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
            animated
          />
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
