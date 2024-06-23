import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../../global.css";

const initialLayout = () => {
  return (
    <>
      <StatusBar style="dark" animated />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="register" />
        <Stack.Screen name="camera" />
      </Stack>
    </>
  );
};

export default initialLayout;
