import Button from "@/src/components/Button";
import Image from "@/src/components/Image";
import { router } from "expo-router";
import { Text, View } from "react-native";

const RegisterSuccess = () => {
  return (
    <View className="flex-1 gap-4">
      <Text className="text-2xl font-bold dark:color-white">
        You successfully registered! 🥳
      </Text>
      <Image
        source={require("@/src/assets/images/summer-illustration.png")}
        className="h-48 w-full rounded-xl"
        resizeMode="contain"
      />
      <View className="flex-1 gap-4">
        <Text className="text-lg font-bold dark:color-white">
          Let's get started!
        </Text>
        <Text className="text-sm dark:color-white" style={{ lineHeight: 24 }}>
          With the power of our app, you can track your daily activities and
          reach your goals! 🚀
        </Text>
        <Text className="text-sm dark:color-white">
          You can now go to the home and start your journey! 🎉
        </Text>
        <Button
          label="Go to login"
          onPress={() => {
            router.push("login");
          }}
        />
      </View>
    </View>
  );
};

export default RegisterSuccess;
