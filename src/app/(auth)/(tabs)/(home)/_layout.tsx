import IconButton from "@/src/components/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Stack } from "expo-router/stack";
import { useColorScheme } from "nativewind";

const HomeStackLayout = () => {
  const { colorScheme } = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={{
          title: "Home",
          headerShown: true,
          headerLeft: () => (
            <IconButton
              onPress={() => {
                router.push("mealHistory");
              }}
              icon={
                <Ionicons
                  name="calendar-outline"
                  size={24}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              }
            />
          ),

          headerRight: () => (
            <IconButton
              onPress={() => {
                router.push("addMeal");
              }}
              icon={
                <Ionicons
                  name="ellipsis-horizontal-outline"
                  size={24}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              }
            />
          ),
        }}
        name="index"
      />
      <Stack.Screen
        name="addMeal"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="addWater"
        options={{
          presentation: "card",
          gestureEnabled: false,
          animation: "flip",
        }}
      />
      <Stack.Screen
        options={{
          title: "Meal History",
          headerShown: true,
        }}
        name="mealHistory"
      />
    </Stack>
  );
};

export default HomeStackLayout;
