import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type Option = {
  label: string;
  value: string;
};

type OptionSelectorProps = {
  onPressBack: () => void;
  onPressForward: () => void;
  value: Option;
};

const OptionSelector = ({
  onPressBack,
  onPressForward,
  value,
}: OptionSelectorProps) => {
  return (
    <View className="container py-4">
      <View className="flex-row items-center justify-between rounded-md border border-gray-300 py-4 dark:border-gray-600">
        <Pressable className="px-4" onPress={onPressBack}>
          <Ionicons name="chevron-back" size={22} color="black" />
        </Pressable>
        <Text>{value.label}</Text>
        <Pressable className="px-4" onPress={onPressForward}>
          <Ionicons name="chevron-forward" size={22} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

export default OptionSelector;
