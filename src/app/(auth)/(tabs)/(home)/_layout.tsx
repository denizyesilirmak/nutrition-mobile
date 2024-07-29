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
    </Stack>
  );
};

export default HomeStackLayout;
