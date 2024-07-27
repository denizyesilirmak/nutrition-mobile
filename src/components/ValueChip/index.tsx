import { View } from "react-native";
import Text from "../Text";

type ValueChipProps = {
  type: "Energy" | "Protein" | "Carbs" | "Fat";
  value: number;
  percent?: number;
};

const VALUE_CHIP_COLORS = {
  Energy: {
    background: "#FFA50020",
    line: "#FF8C00",
  },
  Protein: {
    background: "#FF634720",
    line: "#CD5C5C",
  },
  Carbs: {
    background: "#00FF7F20",
    line: "#3CB371",
  },
  Fat: {
    background: "#33669920",
    line: "#336699",
  },
};

const ValueChip = ({ type, value, percent }: ValueChipProps) => {
  return (
    <View
      style={{
        borderRadius: 8,
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
            color: VALUE_CHIP_COLORS[type].line,
          }}
        >
          {type}
        </Text>
        <Text
          size="xs"
          weight="medium"
          style={{
            color: "black",
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
