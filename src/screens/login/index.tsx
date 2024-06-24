import ScreenView from "@/src/components/ScreenView";
import { ImageBackground, KeyboardAvoidingView, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Text from "@/src/components/Text";
import TextInput from "@/src/components/TextInput";
import Checkbox from "@/src/components/Checkbox";
import { useState } from "react";
import Button from "@/src/components/Button";
import Seperator from "@/src/components/Seperator";
import { router } from "expo-router";

const Login = () => {
  const [remember, setRemember] = useState(false);

  return (
    <ScreenView
      scrollable={false}
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ImageBackground
        source={require("@/src/assets/images/register-bg.png")}
        resizeMethod="resize"
        resizeMode="stretch"
        className="flex h-[250px] w-full items-center justify-end bg-cover bg-center pb-4"
      >
        <Ionicons name="fast-food-outline" size={48} color="black" />
        <View className="items-center justify-center gap-2 p-4">
          <Text color="SECONDARY" size="xxl" weight="medium">
            Welcome to EatInsight
          </Text>
          <Text color="SECONDARY" size="md" weight="regular">
            Track what you eat, and get insights, for free. Lose weight the
            healthy way. We believe in you!
          </Text>
        </View>
      </ImageBackground>

      <View className="gap-3 px-6">
        <TextInput
          placeholder="Enter your email"
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput placeholder="Enter your password" label="Password" secured />

        <View className="flex-row items-center justify-between p-2">
          <Checkbox
            value={remember}
            onChange={(value) => {
              setRemember(value);
            }}
            label="Remember me"
          />
          <Text color="TERTIARY" size="md" weight="regular" underline>
            Forgot password?
          </Text>
        </View>
        <Button
          label="Login"
          onPress={() => router.push("/(auth)/(tabs)/(foods)")}
        />
      </View>
      <View className="mt-4 flex-row justify-center py-4">
        <Text color="TERTIARY" size="md" weight="regular">
          Don't have an account?
          <Text color="PRIMARY" size="md" weight="bold" underline>
            Sign up
          </Text>
        </Text>
      </View>
      <Seperator />

      <View className="items-center justify-center gap-2 p-4">
        <Text color="TERTIARY" size="md" weight="regular">
          Privacy Policy | Terms of Service
        </Text>
        <Text color="TERTIARY" size="md" weight="regular">
          © 2021 EatInsight
        </Text>

        <View className="p-6 opacity-50">
          <Text color="TERTIARY" size="md" weight="regular">
            EatInsight is not a medical app. For medical advice, consult a
            doctor. Nutrition information is provided for educational purposes
            only. You are responsible for what you eat. By using EatInsight, you
            agree to our Privacy Policy and Terms of Service.
          </Text>
        </View>
      </View>
    </ScreenView>
  );
};

export default Login;
