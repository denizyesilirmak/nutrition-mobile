import useSummary from "@/src/query/hooks/useSummary";
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

const EmptyBar = () => {
  return (
    <View className="h-full min-h-3 w-full justify-center rounded-lg bg-gray-300 opacity-10 dark:bg-gray-400">
      <Text className="rotate-90 text-center text-xs text-black dark:text-black">
        No data
      </Text>
    </View>
  );
};

const WeeklyChart = ({ dateRange }: WeeklyChartProps) => {
  const days = eachDayOfInterval({
    start: dateRange.start,
    end: dateRange.end,
  });

  const { summary } = useSummary({
    endDate: format(dateRange.end, "yyyy-MM-dd"),
    startDate: format(dateRange.start, "yyyy-MM-dd"),
  });

  if (!summary) {
    return null;
  }

  return (
    <View className="flex-1 flex-row items-center justify-center gap-2">
      {days.map((day) => {
        const formatedDate = format(day, "yyyy-MM-dd");

        const isDataAvailable =
          !summary[formatedDate]?.percentageFat ||
          !summary[formatedDate]?.percentageCarbonhydrate ||
          !summary[formatedDate]?.percentageProtein;

        return (
          <View
            className="h-full flex-1 items-center justify-center rounded-lg"
            key={day.getDay()}
          >
            <Animated.View className="bg-transparentp w-full flex-1 gap-2 pb-10">
              {!isDataAvailable ? (
                <>
                  <Bar
                    percentage={summary[formatedDate]?.percentageFat! | 0}
                    name="fat"
                  />
                  <Bar
                    percentage={
                      summary[formatedDate]?.percentageCarbonhydrate! | 0
                    }
                    name="carb"
                  />
                  <Bar
                    percentage={summary[formatedDate]?.percentageProtein! | 0}
                    name="protein"
                  />
                </>
              ) : (
                <>
                  <EmptyBar />
                </>
              )}
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
