import { FlashList } from "@shopify/flash-list";
import { add, eachDayOfInterval, format, sub } from "date-fns";
import { useMemo } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

const screenWidth = Dimensions.get("window").width;
const itemCount = 5;
const padding = 16;
const totalPadding = padding * (itemCount + 1);
const itemWidth = (screenWidth - totalPadding) / itemCount;

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

function DateItem({ date }: { date: Date }) {
  return (
    <View
      style={{
        marginHorizontal: padding / 2,
        width: itemWidth - 0.1,
        height: 96,
      }}
    >
      <View className="flex-1 items-center justify-around rounded-lg border border-gray-200 bg-white">
        <Text className="text-xl font-bold">{format(date, "dd")}</Text>
        <Text className="text-sm font-medium uppercase color-gray-500">
          {format(date, "EEE")}
        </Text>
      </View>
    </View>
  );
}

const DatePicker = ({
  onDateChange,
}: {
  onDateChange: (date: Date) => void;
}) => {
  const lastVibrationPoint = useSharedValue(0);
  const currentIndex = useSharedValue(0);

  const result: Date[] = useMemo(() => {
    const today = new Date();

    const year = today.getUTCFullYear();
    const month = today.getUTCMonth();
    const day = today.getUTCDate();

    const dateWithoutTime = new Date(Date.UTC(year, month, day));
    return eachDayOfInterval({
      start: sub(dateWithoutTime, { days: 30 }),
      end: add(dateWithoutTime, { days: 2 }),
    }).toReversed();
  }, []);

  const onDateChangeJS = () => {
    onDateChange(result[Math.round(currentIndex.value + 1)]);
  };

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const index = Math.floor(event.contentOffset.x / (itemWidth + padding / 2));
    currentIndex.value = Math.round(index);
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          width: itemWidth + 10,
          height: 106,
          borderColor: "#9eddff",
          borderWidth: 3,
          borderRadius: 10,
          zIndex: 2,
        }}
      />
      <Animated.FlatList
        data={result}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => <DateItem date={item} />}
        horizontal
        decelerationRate="fast"
        inverted
        contentContainerStyle={{
          paddingHorizontal: padding / 2,
          paddingVertical: padding,
        }}
        snapToInterval={itemWidth + padding}
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        onMomentumScrollEnd={() => {
          runOnJS(onDateChangeJS)();
        }}
      />
    </View>
  );
};

export default DatePicker;
