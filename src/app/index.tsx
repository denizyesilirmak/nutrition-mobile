import { Button, View } from "react-native";
import { router } from "expo-router";

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
    </View>
  );
};

export default HomeScreen;
