import { View } from "react-native";
import { Line, Svg } from "react-native-svg";

const COLORS = ["#9effb8", "#9eddff", "#ffc09e"];

const ProgressLine = ({ progress = 0.4 }) => {
  return (
    <View>
      <Svg height="10" width="70">
        <Line
          x1="4"
          y1="4"
          x2="66"
          y2="4"
          stroke="#f1f1f1"
          strokeWidth={4}
          strokeLinecap="round"
        />
        <Line
          x1="4"
          y1="4"
          x2={66 * progress}
          y2="4"
          stroke={COLORS[Math.floor(progress * COLORS.length)]}
          strokeLinecap="round"
          strokeWidth={4}
        />
      </Svg>
    </View>
  );
};

export default ProgressLine;
