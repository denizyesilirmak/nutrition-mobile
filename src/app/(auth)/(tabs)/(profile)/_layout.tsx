import { Stack } from "expo-router/stack";

const ProfileStackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Profile" }} />
    </Stack>
  );
};

export default ProfileStackLayout;
