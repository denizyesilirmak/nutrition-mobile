import { Stack } from "expo-router/stack";

const AchivementsStackLayout = () => {
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
          title: "Achivements",
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          presentation: "modal",
          animation: "flip",
        }}
      />
    </Stack>
  );
};

export default AchivementsStackLayout;
