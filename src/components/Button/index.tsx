import { Pressable, View } from "react-native";
import Text from "../Text";

type ButtonProps = {
  label: string;
  onPress: () => void;
};

const Button = ({ label, onPress }: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="items-center justify-center rounded-2xl border-2 border-[#cccccc60] opacity-100 active:opacity-60"
    >
      <View className="w-full items-center justify-center rounded-2xl bg-[#33669950] px-4 py-3">
        <Text
          color="SECONDARY"
          size="lg"
          weight="medium"
          style={{
            marginLeft: 8,
          }}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

export default Button;
