import { eachDayOfInterval, format } from "date-fns";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const BAR_COLORS = {
  fat: "bg-yellow-300 dark:bg-yellow-400",
  carb: "bg-green-300 dark:bg-green-400",
  protein: "bg-blue-300 dark:bg-blue-400",
};

type WeeklyChartProps = {
  dateRange: {
    start: Date;
    end: Date;
  };
};

const Bar = ({ percentage, name }: { percentage: number; name: string }) => {
  const animatedHeight = useAnimatedStyle(() => {
    return {
      height: withTiming(`${percentage}%`),
    };
  });

  const animatedOpacity = useAnimatedStyle(() => {
    return {
      opacity: withTiming(percentage > 20 ? 1 : 0),
    };
  });

  return (
    <Animated.View
      // @ts-ignore
      className={`h-1/2 min-h-8 w-full justify-center ${BAR_COLORS[name]}`}
      style={animatedHeight}
    >
      <Animated.Text
        className="text-center text-xs text-black dark:text-black"
        style={animatedOpacity}
      >
        {percentage}%
      </Animated.Text>
      <Animated.Text
        className="text-center text-xs text-black dark:text-black"
        style={animatedOpacity}
      >
        {name}
      </Animated.Text>
    </Animated.View>
  );
};

const WeeklyChart = ({ dateRange }: WeeklyChartProps) => {
  const days = eachDayOfInterval({
    start: dateRange.start,
    end: dateRange.end,
  });

  const noDataPosibility = 1;

  const noDataAnimation = useAnimatedStyle(() => {
    return {
      opacity: withTiming(noDataPosibility ? 1 : 0),
    };
  });

  return (
    <View className="flex-1 flex-row items-center justify-center gap-2">
      {days.map((day) => {
        const fat = Math.floor(Math.random() * 100);
        const carb = Math.floor(Math.random() * (100 - fat));
        const protein = 100 - fat - carb;

        return (
          <View className="h-full flex-1 items-center justify-center overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600">
            <Animated.View
              className="w-full flex-1 overflow-hidden bg-transparent"
              style={noDataAnimation}
            >
              <Bar percentage={fat} name="fat" noData={false} />
              <Bar percentage={carb} name="carb" noData={false} />
              <Bar percentage={protein} name="protein" noData={false} />
            </Animated.View>
            <View className="p-2">
              <Text className="text-center text-lg font-semibold text-black dark:text-white">
                {format(day, "dd")}
              </Text>
              <Text className="text-center text-sm text-black dark:text-white">
                {format(day, "EE")}
              </Text>
              <Text className="text-center text-sm text-black dark:text-white">
                {format(day, "MMM")}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default WeeklyChart;
