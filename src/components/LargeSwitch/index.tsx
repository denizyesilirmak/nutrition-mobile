import { Pressable, Text, View } from "react-native";

type LargeSwitchProps = {
  options: { text: string; value: string }[];
  onChange: (value: string) => void;
  selectedValue?: string;
};

const LargeSwitch = ({
  options,
  onChange,
  selectedValue,
}: LargeSwitchProps) => {
  return (
    <View className="flex-row items-center justify-center overflow-hidden rounded-xl border border-gray-300 dark:border-gray-400">
      {options.map((option) => (
        <Pressable
          key={option.value}
          className={`transition-colors duration-500 ease-in-out flex-1 items-center overflow-hidden py-4 ${selectedValue === option.value ? "bg-lime-500 dark:bg-green-500" : ""}`}
          onPress={() => onChange(option.value)}
        >
          <Text
            className={`text-md ${selectedValue === option.value ? "text-white dark:text-black" : "text-black dark:text-white"}`}
          >
            {option.text}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default LargeSwitch;
