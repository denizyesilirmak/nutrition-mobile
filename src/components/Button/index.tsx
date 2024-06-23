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
      style={({ pressed }) => ({
        borderColor: pressed ? "#33669990" : "#cccccc60",
        height: 46,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
      })}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          backgroundColor: "#33669950",
          borderRadius: 12,
          width: "100%",
        }}
      >
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
