import { Pressable, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Text from "../Text";

type CheckboxProps = {
  value: boolean;
  onChange?: (value: boolean) => void;
  label: string;
};

const Checkbox = ({ value, onChange, label }: CheckboxProps) => {
  return (
    <Pressable
      onPress={() => onChange && onChange(!value)}
      style={{
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
      }}
    >
      <View
        style={{
          borderWidth: 1,
          borderRadius: 8,
          width: 24,
          height: 24,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value ? <Ionicons name="checkmark" size={18} color="black" /> : null}
      </View>
      <Text color="TERTIARY">{label}</Text>
    </Pressable>
  );
};

export default Checkbox;
