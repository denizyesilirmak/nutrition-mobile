import { View } from "react-native";
import Text from "../Text";

type ValueChipProps = {
  type: "Energy" | "Protein" | "Carbs" | "Fat";
  value: number;
  percent?: number;
};

const VALUE_CHIP_COLORS = {
  Energy: {
    background: "orange",
    line: "darkorange",
  },
  Protein: {
    background: "#FF6347",
    line: "#CD5C5C",
  },
  Carbs: {
    background: "#00FF7F",
    line: "#3CB371",
  },
  Fat: {
    background: "#4682B4",
    line: "cyan",
  },
};

const ValueChip = ({ type, value, percent }: ValueChipProps) => {
  return (
    <View
      style={{
        borderRadius: 8,
        gap: 6,
        backgroundColor: VALUE_CHIP_COLORS[type].background,
        width: 72,
        height: 22,
        paddingTop: 2,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Text
          size="xs"
          weight="bold"
          style={{
            color: "white",
          }}
        >
          {type}
        </Text>
        <Text
          size="xs"
          weight="medium"
          style={{
            color: "white",
          }}
        >
          200
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          height: 4,
        }}
      >
        <View
          style={{
            width: "50%",
            height: "100%",
            backgroundColor: VALUE_CHIP_COLORS[type].line,
          }}
        />
      </View>
    </View>
  );
};

export default ValueChip;
