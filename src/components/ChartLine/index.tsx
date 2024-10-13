import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

type ChartLineProps = {
  value?: number;
};

const ChartLine = ({ value = 0 }: ChartLineProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(value * 100, {
        damping: 50,
        stiffness: 90,
      }),
    };
  }, [value]);

  return (
    <View className="-1 flex flex-row p-2">
      <View className="h-2 w-full overflow-hidden rounded-full bg-gray-300 dark:bg-gray-500">
        <Animated.View
          className={`h-2 bg-green-500 duration-500 dark:bg-lime-400`}
          style={animatedStyle}
        />
      </View>
    </View>
  );
};

export default ChartLine;
