import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { Pressable, Text, View } from "react-native";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange?: () => void;
};

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
  const { colorScheme } = useColorScheme();
  return (
    <Pressable
      onPress={onChange}
      className="w-full flex-row items-center gap-2 rounded-lg"
    >
      <View className={`${checked ? "rotate-0" : "rotate-90"} transition-all`}>
        <MaterialIcons
          name={checked ? "check-box" : "check-box-outline-blank"}
          size={24}
          color={
            checked ? "#84cc16" : colorScheme === "dark" ? "#9ca3af" : "#9ca3af"
          }
        />
      </View>
      <Text className="color-gray-500 dark:text-gray-400">{label}</Text>
    </Pressable>
  );
};

export default Checkbox;
