import { Stack } from "expo-router/stack";

const HomeStackLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="addMeal"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="addWater"
        options={{
          presentation: "modal",
          gestureEnabled: false,
          animation: "flip",
        }}
      />
      <Stack.Screen name="mealHistory" />
    </Stack>
  );
};

export default HomeStackLayout;
