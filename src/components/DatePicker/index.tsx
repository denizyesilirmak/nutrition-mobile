import { FlashList } from "@shopify/flash-list";
import { add, eachDayOfInterval, format, sub } from "date-fns";
import { useMemo } from "react";
import { Dimensions, Text, View } from "react-native";
import Animated, {
  ScrollHandler,
  runOnJS,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { useSharedValue } from "react-native-worklets-core";

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
        width: itemWidth,
        height: 96,
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
          borderRadius: 8,
          borderWidth: 1,
        }}
      >
        <Text>{format(date, "dd")}</Text>
        <Text>{format(date, "EEE")}</Text>
      </View>
    </View>
  );
}

const DatePicker = () => {
  const lastVibrationPoint = useSharedValue(0);

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

  const vibrate = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  };

  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: (event) => {
        const interval = itemWidth + padding;
        const currentVibrationPoint = Math.floor(
          event.contentOffset.x / interval
        );

        if (
          event.contentOffset.x % interval < interval &&
          lastVibrationPoint.value !== currentVibrationPoint
        ) {
          runOnJS(vibrate)();
          lastVibrationPoint.value = currentVibrationPoint;
        }
      },
    },
    []
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AnimatedFlashList
        data={result}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => <DateItem date={item} />}
        estimatedItemSize={100}
        horizontal
        inverted
        contentContainerStyle={{
          paddingHorizontal: padding / 2,
          paddingVertical: padding,
        }}
        snapToInterval={itemWidth + padding}
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
      />
    </View>
  );
};

export default DatePicker;
