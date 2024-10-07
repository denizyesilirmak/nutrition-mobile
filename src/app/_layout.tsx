import { Stack, useNavigation } from "expo-router";
import "../../global.css";
import { ThemeProvider } from "@react-navigation/native";
import { DarkTheme, LightTheme } from "../constants/Colors";
import { QueryProvider } from "../query/QueryProvider";
import { useColorScheme } from "nativewind";
import { StatusBar } from "react-native";
import IconButton from "../components/IconButton";
import { EvilIcons, Ionicons } from "@expo/vector-icons";

const InitialLayout = () => {
  const { colorScheme } = useColorScheme();

  const navigation = useNavigation();

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
              navigationBarColor: "red",
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
                headerRight: () => (
                  <IconButton
                    icon={
                      <Ionicons name="log-in-outline" size={24} color="white" />
                    }
                    onPress={() => navigation.navigate("/login")}
                  />
                ),
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
