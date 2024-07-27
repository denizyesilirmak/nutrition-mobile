import TextInput from "@/src/components/TextInput";
import { Text, View } from "react-native";

const RegisterBasic = ({
  email,
  setEmail,
  password,
  setPassword,
  passwordVerify,
  setPasswordVerify,
  passwordErrors,
}: {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  passwordVerify: string;
  setPasswordVerify: (password: string) => void;
  passwordErrors: {
    validEmail: "default" | "error" | "satisfied";
    length: "default" | "error" | "satisfied";
    uppercase: "default" | "error" | "satisfied";
    lowercase: "default" | "error" | "satisfied";
    match: "default" | "error" | "satisfied";
  };
  setPasswordErrors: (errors: {
    validEmail: "default" | "error" | "satisfied";
    length: "default" | "error" | "satisfied";
    uppercase: "default" | "error" | "satisfied";
    lowercase: "default" | "error" | "satisfied";
    match: "default" | "error" | "satisfied";
  }) => void;
}) => {
  const getErrorColor = (status: "default" | "error" | "satisfied") => {
    switch (status) {
      case "default":
        return "text-gray-500";
      case "error":
        return "text-red-500";
      case "satisfied":
        return "text-green-500";
    }
  };

  return (
    <View className="flex-1 items-center gap-4">
      <Text className="text-2xl font-bold dark:color-white">
        We'd love to see you here! 🎉
      </Text>
      <TextInput
        icon="email"
        placeholder="Email Address"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        icon="lock"
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TextInput
        icon="lock"
        placeholder="Password Verify"
        secureTextEntry
        onChangeText={setPasswordVerify}
        value={passwordVerify}
      />
      <View className="bg w-full flex-1 gap-2">
        <Text className="text-sm font-bold dark:color-white">
          Email Requirements
        </Text>
        <Text className={`text-sm ${getErrorColor(passwordErrors.validEmail)}`}>
          ✉️ Email must be a valid email address
        </Text>
        <Text className="text-sm font-bold dark:color-white">
          Password Requirements
        </Text>
        <Text className={`text-sm ${getErrorColor(passwordErrors.length)}`}>
          🔏 Password must be at least 8 characters long
        </Text>
        <Text className={`text-sm ${getErrorColor(passwordErrors.uppercase)}`}>
          🔠 Password must contain at least one uppercase letter
        </Text>
        <Text className={`text-sm ${getErrorColor(passwordErrors.lowercase)}`}>
          🔡 Password must contain at least one lowercase
        </Text>
        <Text className={`text-sm ${getErrorColor(passwordErrors.match)}`}>
          🔐 Passwords must match
        </Text>
      </View>
    </View>
  );
};

export default RegisterBasic;
