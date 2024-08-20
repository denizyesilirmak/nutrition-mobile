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
        name="scanfood"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="foodDetail"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

export default FoodsStackLayout;
