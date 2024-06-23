import Button from "@/src/components/Button";
import Checkbox from "@/src/components/Checkbox";
import ScreenView from "@/src/components/ScreenView";
import Seperator from "@/src/components/Seperator";
import Text from "@/src/components/Text";
import TextInput from "@/src/components/TextInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import { ImageBackground, View } from "react-native";

const Register = () => {
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
        style={{
          width: "100%",
          height: 250,
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 16,
        }}
      >
        <Ionicons name="fast-food-outline" size={48} color="black" />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            gap: 8,
          }}
        >
          <Text color="SECONDARY" size="xxl" weight="medium">
            Welcome to EatInsight
          </Text>
          <Text color="SECONDARY" size="md" weight="regular" center>
            Track what you eat, and get insights, for free. Lose weight the
            healthy way. We believe in you!
          </Text>
        </View>
      </ImageBackground>

      <View
        style={{
          paddingHorizontal: 24,
          gap: 12,
        }}
      >
        <TextInput
          placeholder="Enter your email"
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput placeholder="Enter your password" label="Password" secured />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 8,
            paddingVertical: 8,
            alignItems: "center",
          }}
        >
          <Checkbox
            value={remember}
            onChange={(value) => {
              console.log(value);
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          paddingVertical: 16,
          marginTop: 16,
        }}
      >
        <Text color="TERTIARY" size="md" weight="regular">
          Don't have an account?{" "}
          <Text color="PRIMARY" size="md" weight="bold" underline>
            Sign up
          </Text>
        </Text>
      </View>
      <Seperator />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 16,
          gap: 8,
        }}
      >
        <Text color="TERTIARY" size="md" weight="regular">
          Privacy Policy | Terms of Service
        </Text>
        <Text color="TERTIARY" size="md" weight="regular">
          © 2021 EatInsight
        </Text>

        <View
          style={{
            padding: 24,
            opacity: 0.5,
          }}
        >
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

export default Register;
