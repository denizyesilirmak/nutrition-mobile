import { View } from "react-native";
import Animated, {
  useAnimatedProps,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Line, Svg } from "react-native-svg";

const COLORS = ["#9effb8", "#9eddff", "#ffc09e"];

const ProgressLine = ({ progress = 0.4, index = 1 }) => {
  const AnimatedLine = Animated.createAnimatedComponent(Line);

  const animatedProps = useAnimatedProps(() => {
    return {
      x2: withSequence(
        withTiming(0, { duration: 200 }),
        withDelay(50 * index, withSpring(progress * 66, { damping: 6 })),
      ),
    };
  }, [progress]);

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
        <AnimatedLine
          x1="4"
          y1="4"
          y2="4"
          stroke={COLORS[Math.floor(progress * COLORS.length)]}
          strokeLinecap="round"
          strokeWidth={4}
          animatedProps={animatedProps}
        />
      </Svg>
    </View>
  );
};

export default ProgressLine;
