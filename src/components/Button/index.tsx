import { ActivityIndicator, Pressable, Text } from "react-native";

type ButtonProps = {
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

const Button = ({ label, onPress, disabled, loading }: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="w-full items-center justify-center rounded-xl border border-lime-200 bg-green-500 py-4 active:bg-green-400 dark:border-gray-400 dark:bg-lime-500 active:dark:bg-lime-400"
      disabled={disabled}
    >
      <Text
        className="font-semibold text-white dark:text-black"
        style={{ opacity: disabled ? 0.5 : 1 }}
      >
        {label}
      </Text>
      {loading && (
        <ActivityIndicator
          className="absolute right-0 mr-4"
          size="small"
          color="white"
          animating={disabled}
        />
      )}
    </Pressable>
  );
};

export default Button;
