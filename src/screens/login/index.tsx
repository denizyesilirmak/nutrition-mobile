import ScreenView from "@/src/components/ScreenView";
import TextInput from "@/src/components/TextInput";
import { useEffect, useState } from "react";

import Button from "@/src/components/Button";
import Checkbox from "@/src/components/Checkbox";
import { useLogin } from "@/src/query/hooks/useLogin";
import { useAuth } from "@/src/store/authStore";
import { router } from "expo-router";
import { Image, Keyboard, SafeAreaView, Text, View } from "react-native";
import { isValidEmail, isValidPassword } from "./utils";

const Login = () => {
  const [remember, setRemember] = useState(false);
  const { isLoggedIn, setToken } = useAuth();

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

  const { isError, isPending, isSuccess, login, data } = useLogin({
    email: loginInformation.email.text,
    password: loginInformation.password.text,
  });

  useEffect(() => {
    // console.log("isLoggedIn", isLoggedIn);
    if (isSuccess) {
      if (remember) {
        // Save user data to local storage
      }

      const token = data?.data.token;
      if (token) {
        setToken(token);
        router.push("(auth)/(home)");
      }
    }
  }, [isSuccess, remember]);

  const handleLogin = () => {
    Keyboard.dismiss();
    login();

    return;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            loading={isPending}
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
    </SafeAreaView>
  );
};

export default Login;
