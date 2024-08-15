import { MaterialIcons } from "@expo/vector-icons";
import { TextInput as RNTextInput, View } from "react-native";
import { TextInputProps } from "./types";
import { useColorScheme } from "nativewind";

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
  onPress,
  editable,
}: TextInputProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <View
      className="flex-row items-center rounded-xl border border-gray-300 px-4 dark:border-gray-400"
      style={{
        borderColor: error
          ? colorScheme === "dark"
            ? "#f87171"
            : "#ef4444"
          : colorScheme === "dark"
            ? "#374151"
            : "#d1d5db",
      }}
    >
      {icon && (
        <MaterialIcons
          name={icon}
          size={18}
          className="pr-2"
          color={colorScheme === "dark" ? "#9ca3af" : "#707070"}
        />
      )}
      <RNTextInput
        onPress={onPress}
        editable={editable}
        className="flex-1 py-4 color-black dark:text-white"
        placeholder={placeholder}
        keyboardType={keyboardType || "default"}
        autoCapitalize={autoCapitalize || "none"}
        placeholderTextColor={colorScheme === "dark" ? "#9ca3af" : "#707070"}
        secureTextEntry={secureTextEntry}
        keyboardAppearance={colorScheme === "dark" ? "dark" : "light"}
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
