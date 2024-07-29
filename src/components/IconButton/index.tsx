import { Pressable } from "react-native";
import { IconButtonProps } from "./types";

const IconButton = (props: IconButtonProps) => {
  const { icon, onPress } = props;
  return (
    <Pressable
      onPress={onPress}
      className="rounded-full p-2 active:bg-gray-200 dark:active:bg-gray-700"
    >
      {icon}
    </Pressable>
  );
};

export default IconButton;
