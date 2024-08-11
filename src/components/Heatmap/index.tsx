import { format, isSameMonth, isWeekend } from "date-fns";
import { Dimensions, Text, View } from "react-native";
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
};

const Square = ({ isInCurrentMonth, date }: SquareProps) => {
  return (
    <View
      style={{
        width: Math.round(width / 7) - 8,
        height: Math.round(width / 7) - 8 + 10,
        opacity: isInCurrentMonth ? 1 : 0.5,
      }}
    >
      <View
        className={`h-full w-full items-center justify-evenly rounded-md ${
          isWeekend(date) ? "bg-lime-100" : "bg-gray-100"
        }`}
      >
        <View className="items-center justify-center">
          <Text
            style={{ fontSize: 12 }}
            className="font-semibold text-gray-800"
          >
            {format(date, "dd")}
          </Text>
          <Text style={{ fontSize: 8 }} className="text-gray-800">
            {format(date, "MMM")}
          </Text>
          <Text style={{ fontSize: 8 }} className="text-gray-500">
            {format(date, "EE")}
          </Text>
        </View>
        <View className="bg-blue border-1 h-1 w-8 rounded-full border border-gray-400">
          <View
            className="bg-blue h-full rounded-full bg-red-900"
            style={{
              width: ["100%", "75%", "50%", "25%", "0%"][
                Math.floor(Math.random() * 5)
              ],
            }}
          ></View>
        </View>
      </View>
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

const Heatmap = ({ year, month }: { year: number; month: number }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withSequence(
        withTiming(0, { duration: 0 }),
        withTiming(1, { duration: 200 }),
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
            />
          ))}
        </Row>
      ))}
    </Animated.View>
  );
};

export default Heatmap;
