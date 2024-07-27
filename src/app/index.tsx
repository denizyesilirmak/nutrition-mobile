import { router } from "expo-router";
import { Button, View } from "react-native";

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        title="Login"
        onPress={() => {
          router.push("login");
        }}
      />

      <Button
        title="Register"
        onPress={() => {
          router.push("register");
        }}
      />

      <Button
        title="Camera"
        onPress={() => {
          router.push("camera");
        }}
      />

      <Button
        title="Onboarding"
        onPress={() => {
          router.push("onboarding");
        }}
      />

      <Button title="React Query" onPress={() => {}} />
    </View>
  );
};

export default HomeScreen;
