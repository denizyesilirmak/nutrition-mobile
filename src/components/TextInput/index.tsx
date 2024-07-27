import { MaterialIcons } from "@expo/vector-icons";
import { TextInput as RNTextInput, useColorScheme, View } from "react-native";
import { TextInputProps } from "./types";

const TextInput = ({
  placeholder,
  keyboardType,
  autoCapitalize,
  icon,
  secureTextEntry,
  error,
  onChangeText,
  onBlur,
  value,
  postFix,
}: TextInputProps) => {
  const colorSheme = useColorScheme();

  return (
    <View
      className="flex-row items-center rounded-xl border border-gray-300 px-4 dark:border-gray-400"
      style={{
        borderColor: error
          ? colorSheme === "dark"
            ? "#f87171"
            : "#ef4444"
          : colorSheme === "dark"
            ? "#374151"
            : "#d1d5db",
      }}
    >
      {icon && (
        <MaterialIcons
          name={icon}
          size={18}
          className="pr-2"
          color={colorSheme === "dark" ? "#9ca3af" : "#707070"}
        />
      )}
      <RNTextInput
        className="flex-1 py-4 color-black dark:text-white"
        placeholder={placeholder}
        keyboardType={keyboardType || "default"}
        autoCapitalize={autoCapitalize || "none"}
        placeholderTextColor={colorSheme === "dark" ? "#9ca3af" : "#707070"}
        secureTextEntry={secureTextEntry}
        keyboardAppearance={colorSheme === "dark" ? "dark" : "light"}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
      />
      {postFix && (
        <View className="flex-row items-center">
          <RNTextInput
            className="color-black dark:text-white"
            value={postFix}
            editable={false}
          />
        </View>
      )}
    </View>
  );
};

export default TextInput;
