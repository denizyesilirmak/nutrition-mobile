import { eachDayOfInterval, format } from "date-fns";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
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

  return (
    <Animated.View
      // @ts-ignore
      className={`h-1/2 min-h-3 w-full justify-center ${BAR_COLORS[name]} rounded-lg`}
      style={animatedHeight}
    >
      <Animated.Text className="text-center text-xs text-black dark:text-black">
        {percentage > 20 ? `${percentage}% ${"\n"}` : ""}
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
        function getRandomNutrientValues() {
          const minValue = 10;
          const maxTotal = 100;

          // Start by allocating the minimum value to each nutrient
          let fat = minValue;
          let carb = minValue;
          let protein = minValue;

          // Calculate the remaining value to be distributed randomly
          let remaining = maxTotal - (fat + carb + protein);

          // Randomly allocate the remaining value to fat and carb
          fat += Math.floor(Math.random() * (remaining + 1));
          remaining = maxTotal - (fat + carb + protein); // Recalculate remaining after adding to fat

          carb += Math.floor(Math.random() * (remaining + 1));
          remaining = maxTotal - (fat + carb + protein); // Recalculate remaining after adding to carb

          // The remaining value goes to protein
          protein += remaining;

          return { fat, carb, protein };
        }

        const { fat, carb, protein } = getRandomNutrientValues();

        return (
          <View
            className="h-full flex-1 items-center justify-center rounded-lg"
            key={day.getDay()}
          >
            <Animated.View
              className="bg-transparentp w-full flex-1 gap-2 pb-10"
              style={noDataAnimation}
            >
              <Bar percentage={fat} name="fat" />
              <Bar percentage={carb} name="carb" />
              <Bar percentage={protein} name="protein" />
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
