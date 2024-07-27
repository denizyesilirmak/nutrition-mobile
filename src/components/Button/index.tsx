import { Pressable, Text } from "react-native";

type ButtonProps = {
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
};

const Button = ({ label, onPress, disabled }: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="w-full items-center justify-center rounded-xl border border-lime-200 bg-lime-500 py-4 active:bg-lime-400 dark:border-gray-400 dark:bg-green-500 active:dark:bg-green-400"
      disabled={disabled}
    >
      <Text
        className="font-semibold text-white dark:text-black"
        style={{ opacity: disabled ? 0.5 : 1 }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default Button;
