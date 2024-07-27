import ScreenView from "@/src/components/ScreenView";
import TextInput from "@/src/components/TextInput";
import { useState } from "react";

import Button from "@/src/components/Button";
import Checkbox from "@/src/components/Checkbox";
import { Alert, Image, Keyboard, Text, View } from "react-native";
import { isValidEmail, isValidPassword } from "./utils";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { LOGIN_API } from "@/src/constants/Api";
import Storage from "@/src/storage";

const fetchLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const body = JSON.stringify({ email, password });
  const response = await fetch(LOGIN_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();

  return {
    data,
    status: response.status,
  };
};

const Login = () => {
  const [remember, setRemember] = useState(false);

  const [loginInformation, setLoginInformation] = useState<
    Record<string, { text: string; error: boolean }>
  >({
    email: {
      text: "test@gmail.com",
      error: false,
    },
    password: {
      text: "burakakyol",
      error: false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: fetchLogin,
    onSuccess: (data) => {
      console.log("[Login] onSuccess:", data);
      if (data.status === 200) {
        const token = data.data.token;
        const status = data.data.status;

        if (status) {
          //Save token to storage and navigate to home
          Storage.setItem("TOKEN", token);
          Storage.setItem("REMEMBER_ME", remember ? "true" : "false");

          router.push("home");
        }
      } else {
        Alert.alert("Error", "Email or password is incorrect.");
        setLoginInformation({
          email: {
            text: loginInformation.email.text,
            error: true,
          },
          password: {
            text: loginInformation.password.text,
            error: true,
          },
        });
      }
    },
    onMutate: (variables) => {
      console.log("[Login] onMutate:", variables);
      Keyboard.dismiss();
    },
    onError: (error) => {
      console.log("[Login] onError:", error);
      Alert.alert("Error", "An error occurred while logging in.");
    },
  });

  const handleLogin = () => {
    mutate({
      email: loginInformation.email.text,
      password: loginInformation.password.text,
    });

    return;
  };

  return (
    <ScreenView scrollable={false} padding>
      <View className="items-center gap-4">
        <Image
          source={require("@/src/assets/images/icon.png")}
          className="h-16 w-16 rounded-xl bg-slate-200"
        />
        <Text className="text-2xl font-bold dark:color-white">
          Welcome back!
        </Text>
        <TextInput
          icon="email"
          placeholder="Email Address"
          autoCapitalize="none"
          keyboardType="email-address"
          error={loginInformation.email.error}
          value={loginInformation.email.text}
          onChangeText={(text) =>
            setLoginInformation({
              ...loginInformation,
              email: {
                text,
                error: !isValidEmail(text),
              },
            })
          }
        />
        <TextInput
          icon="lock"
          placeholder="Password"
          secureTextEntry
          error={loginInformation.password.error}
          value={loginInformation.password.text}
          onChangeText={(text) =>
            setLoginInformation({
              ...loginInformation,
              password: { text, error: !isValidPassword(text) },
            })
          }
        />
        <Button
          label="Login"
          disabled={
            !isValidEmail(loginInformation.email.text) ||
            !isValidPassword(loginInformation.password.text)
          }
          onPress={handleLogin}
        />
        <Checkbox
          label="Remember me"
          checked={remember}
          onChange={() => setRemember(!remember)}
        />
      </View>
      <View className="flex-1 items-center justify-end gap-2">
        <Text className="text-center text-sm dark:color-white">
          Don't have an account?{" "}
          <Text
            onPress={() => {
              router.push("register");
            }}
            className="text-green-500"
          >
            Sign Up!
          </Text>
        </Text>
        <Text className="text-center text-sm dark:color-white">
          Forgot your password?{" "}
          <Text className="text-green-500">Reset password</Text>
        </Text>

        <Text className="text-center text-sm leading-6 dark:color-white">
          By continuing, you agree to our{" "}
          <Text className="text-green-500">Terms of Service</Text> and{" "}
          <Text className="text-green-500">Privacy Policy</Text>
        </Text>
      </View>
    </ScreenView>
  );
};

export default Login;
