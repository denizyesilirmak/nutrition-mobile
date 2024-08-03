import { Stack } from "expo-router/stack";

const AchivementsStackLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default AchivementsStackLayout;
