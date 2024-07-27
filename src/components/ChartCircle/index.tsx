import { Text, useColorScheme, View } from "react-native";
import Animated, {
  useAnimatedProps,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Circle, Svg } from "react-native-svg";

type ChartCircleProps = {
  calorie: number;
  total: number;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ChartCircle = ({ calorie, total }: ChartCircleProps) => {
  const clampedValue = Math.min(Math.max(calorie / total, 0), 1);
  const colorScheme = useColorScheme();

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withSpring(Math.PI * 2 * 30 * (1 - clampedValue), {
        damping: 10,
        stiffness: 100,
      }),
      strokeWidth: withSequence(
        withTiming(6, { duration: 100 }),
        withTiming(10, { duration: 300 }),
        withTiming(6, { duration: 500 }),
      ),
    };
  }, [clampedValue]);

  return (
    <View className="h-32 w-32 items-center">
      <Text className="absolute top-12 text-2xl font-bold text-black dark:text-white">
        {calorie}
      </Text>
      <Text className="absolute top-20 text-sm font-bold text-black dark:text-white">
        kCal
      </Text>
      <Svg height="100%" width="100%" viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="55"
          r="40"
          strokeWidth="8"
          fill="none"
          stroke={colorScheme === "dark" ? "#4b5563" : "#d1d5db"}
          strokeDasharray={[Math.PI * 2 * 30, Math.PI * 2 * 30]}
          rotation={135}
          origin="50, 55"
          strokeLinecap="round"
        />
        <AnimatedCircle
          cx="50"
          cy="55"
          r="40"
          strokeWidth="6"
          fill="none"
          stroke={colorScheme === "dark" ? "#84cc16" : "#4ade80"}
          strokeDasharray={[Math.PI * 2 * 30 * 1, 1000]}
          rotation={135}
          origin="50, 55"
          strokeLinecap="round"
          strokeDashoffset={Math.PI * 2 * 30 * (1 - 0.1)}
          animatedProps={animatedProps}
        />
      </Svg>
    </View>
  );
};

export default ChartCircle;
