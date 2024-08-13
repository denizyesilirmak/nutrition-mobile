import { format, isSameMonth, isWeekend } from "date-fns";
import {
  Dimensions,
  DimensionValue,
  Pressable,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { getWeeksOfMonth } from "./utils";

const { width } = Dimensions.get("window");

type SquareProps = {
  isInCurrentMonth: boolean;
  date: Date;
  onPress?: () => void;
  value?: number;
};

const Square = ({ isInCurrentMonth, date, onPress, value }: SquareProps) => {
  return (
    <View
      style={{
        width: Math.round(width / 7) - 8,
        height: Math.round(width / 7) - 8 + 10,
        opacity: isInCurrentMonth ? 1 : 0.3,
      }}
    >
      <Pressable
        onPress={onPress}
        className={`h-full w-full items-center justify-evenly rounded-md ${
          isWeekend(date)
            ? "bg-gray-200 dark:bg-gray-900"
            : "bg-gray-100 dark:bg-gray-800"
        }`}
      >
        <View className="items-center justify-center">
          <Text
            style={{ fontSize: 12 }}
            className="font-semibold text-gray-800 dark:text-gray-100"
          >
            {format(date, "dd")}
          </Text>
          <Text
            style={{ fontSize: 8 }}
            className="text-gray-800 dark:text-gray-100"
          >
            {format(date, "MMM")}
          </Text>
          <Text
            style={{ fontSize: 8 }}
            className="text-gray-500 dark:text-gray-100"
          >
            {format(date, "EE")}
          </Text>
        </View>
        <View className="bg-blue border-1 h-2 w-8 rounded-full border border-gray-400 dark:border-gray-600">
          <View
            className="bg-blue h-full rounded-full bg-cyan-600 dark:bg-blue-300"
            style={{
              width: value ? `${(value / 10) * 100}%` : 0,
            }}
          ></View>
        </View>
      </Pressable>
    </View>
  );
};

const Row = ({ children }: { children?: React.ReactNode }) => {
  return (
    <View className="flex-row items-center justify-evenly py-1">
      {children}
    </View>
  );
};

type HeatmapProps = {
  year: number;
  month: number;
  onPressDate?: (date: Date) => void;
};

const Heatmap = ({ year, month, onPressDate }: HeatmapProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withSequence(
        withTiming(0, { duration: 0 }),
        withTiming(1, { duration: 100 }),
      ),
    };
  }, [year, month]);

  const days = getWeeksOfMonth({
    year: year,
    month: month,
  });

  return (
    <Animated.View style={[animatedStyle]}>
      {days.map((week, index) => (
        <Row key={index}>
          {week.map((day) => (
            <Square
              key={format(day, "dd-MM-yyyy")}
              isInCurrentMonth={isSameMonth(day, new Date(2024, month - 1))}
              date={day}
              onPress={() => onPressDate?.(day)}
              value={Math.floor(Math.random() * 10)}
            />
          ))}
        </Row>
      ))}
    </Animated.View>
  );
};

export default Heatmap;
