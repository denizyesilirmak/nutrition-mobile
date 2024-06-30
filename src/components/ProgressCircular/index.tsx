import { Text, View } from "react-native";
import Animated, {
  useAnimatedProps,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { PropTypes } from "./types";

const COLORS = ["#9effb8", "#9eddff", "#ffc09e"];

const ProgressCircular = ({ progress = 0, target = 2000 }: PropTypes) => {
  const AnimatedCirle = Animated.createAnimatedComponent(Circle);

  const animatedPropsWidth = useAnimatedProps(() => {
    return {
      strokeWidth: withSequence(
        withTiming(0, { duration: 500 }),
        withDelay(200, withSpring(10, { damping: 6 })),
      ),
    };
  }, [progress]);

  const animatedPropsDash = useAnimatedProps(() => {
    return {
      strokeWidth: withSequence(
        withTiming(0, { duration: 0 }),
        withDelay(500, withSpring(10, { damping: 6 })),
      ),
      opacity: withSequence(
        withTiming(0, { duration: 0 }),
        withDelay(500, withTiming(1, { duration: 200 })),
      ),
    };
  }, [progress]);

  const clamp = (value: number, lowerBound: number, upperBound: number) => {
    "worklet";
    return Math.min(Math.max(lowerBound, value), upperBound);
  };

  return (
    <View className="flex-row items-center justify-center">
      <View className="absolute z-10 items-center justify-center">
        <Text className="align-middle text-3xl font-bold">
          {progress * target}
        </Text>
        <Text className="text-sm">kCal left</Text>
      </View>
      <Svg height="120" width="130">
        <AnimatedCirle
          rotation={135}
          origin={"65, 65"}
          cx="65"
          cy="65"
          r="60"
          stroke="#f1f1f1"
          animatedProps={animatedPropsWidth}
          fill="none"
          strokeDasharray={[Math.PI * 90, Math.PI * 90]}
          strokeLinecap="round"
        />
        <AnimatedCirle
          rotation={135}
          origin={"65, 65"}
          cx="65"
          cy="65"
          r="60"
          fill="none"
          strokeDasharray={[284 * clamp(progress, 0, 1), 1000, 0]}
          strokeLinecap="round"
          animatedProps={animatedPropsDash}
          strokeWidth={10}
          stroke={COLORS[Math.floor(progress * 3)]}
        />
      </Svg>
    </View>
  );
};

export default ProgressCircular;
