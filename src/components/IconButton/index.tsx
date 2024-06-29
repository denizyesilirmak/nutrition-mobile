import { Pressable } from "react-native";
import { IconButtonProps } from "./types";

const IconButton = (props: IconButtonProps) => {
  const { icon } = props;
  return (
    <Pressable className="rounded-full p-2 active:bg-white">{icon}</Pressable>
  );
};

export default IconButton;
