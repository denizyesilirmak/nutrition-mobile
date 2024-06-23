import { TextInput as RnTextInput, View } from "react-native";
import { TextInputProps } from "./types";
import Text from "../Text";
import { useState } from "react";

const TextInput = ({
  onChangeText,
  value,
  placeholder,
  label,
  secured,
  autoCapitalize,
  keyboardType,
}: TextInputProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <View
      style={{
        gap: 6,
      }}
    >
      {label && (
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
      )}
      <View
        style={{
          borderWidth: 2,
          borderColor: focused ? "#33669990" : "#cccccc60",
          borderRadius: 14,
        }}
      >
        <RnTextInput
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          secureTextEntry={secured}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            height: 46,
            padding: 10,
            borderRadius: 12,
            fontSize: 16,
            paddingLeft: 16,
          }}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"gray"}
        />
      </View>
    </View>
  );
};

export default TextInput;
