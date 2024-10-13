import { Stack } from "expo-router/stack";

const FoodsStackLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Foods",
        }}
      />
      <Stack.Screen
        name="foodDetail"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="nutritionDetail"
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Nutrition Details",
        }}
      />
    </Stack>
  );
};

export default FoodsStackLayout;
