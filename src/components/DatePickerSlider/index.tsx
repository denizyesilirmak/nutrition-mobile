import { eachDayOfInterval, format } from "date-fns";
import { useRef } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  Text,
  useColorScheme,
  View,
} from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { Path, Svg } from "react-native-svg";
import { DateItemProps, DatePickerSliderProps } from "./types";

const screenWidth = Dimensions.get("window").width;

const dateBoxCount = 5;
const dateMarginCount = dateBoxCount + 1;
const dateBoxMargin = 10;
const dateBoxWidth =
  (screenWidth - dateBoxMargin * dateMarginCount) / dateBoxCount;

const DateItem = ({
  currentDate,
  index,
  datesLength,
  onPress,
}: DateItemProps) => {
  return (
    <Pressable
      onPressOut={onPress}
      className={`flex -scale-x-100 items-center justify-center rounded-lg bg-green-500 dark:bg-lime-500`}
      style={{
        width: dateBoxWidth,
        height: "100%",
        opacity: index > 1 && index < datesLength - 2 ? 1 : 0.4,
      }}
    >
      <Text className="bg text-xl font-extrabold color-white dark:color-black">
        {format(currentDate, "dd")}
      </Text>
      <Text className="text-md font-semibold color-white dark:color-black">
        {format(currentDate, "EEE")}
      </Text>
    </Pressable>
  );
};

const DatePickerSlider = ({
  daysAgo = 10,
  onDateChange,
}: DatePickerSliderProps) => {
  const flatListRef = useRef<FlatList>(null);
  const colorScheme = useColorScheme();

  const dates = eachDayOfInterval({
    start: new Date(new Date().setDate(new Date().getDate() + 2)),
    end: new Date(new Date().setDate(new Date().getDate() - daysAgo)),
  });

  const scaleSharedValue = useSharedValue(1);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const offset = event.contentOffset.x;

    const currentIndex = offset / (dateBoxWidth + dateBoxMargin);

    if (currentIndex % 1 === 0) {
      scaleSharedValue.value = 1;
    } else {
      scaleSharedValue.value = 1.1;
    }
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withDelay(
            50,
            withTiming(
              scaleSharedValue.value,

              { duration: 180, easing: Easing.inOut(Easing.ease) },
            ),
          ),
        },
      ],
      backgroundColor:
        scaleSharedValue.value === 1.1
          ? withTiming(
              interpolateColor(
                scaleSharedValue.value,
                [1, 1.1],
                ["#ffffff00", "#ffffff90"],
              ),
              { duration: 500, easing: Easing.inOut(Easing.ease) },
            )
          : withTiming(
              interpolateColor(
                scaleSharedValue.value,
                [1.1, 1],
                ["#ffffff90", "#ffffff00"],
              ),
              { duration: 1600, easing: Easing.inOut(Easing.ease) },
            ),
    };
  });

  return (
    <View className="w-full items-center justify-center">
      <Animated.View
        pointerEvents="none"
        className="absolute z-10 rounded-lg border-2 border-green-900 dark:border-white"
        style={[{ height: 80, width: dateBoxWidth }, animatedStyle]}
      >
        <Svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <Path
            d="M 40 100 L 60 100 L 50 90 Z"
            fill={colorScheme === "dark" ? "#ffffff" : "#14532d"}
            stroke="none"
            strokeWidth={2}
          />
        </Svg>
      </Animated.View>
      <Animated.FlatList
        ref={flatListRef}
        data={dates}
        horizontal
        renderItem={({ item, index }) => (
          <DateItem
            currentDate={item}
            index={index}
            datesLength={dates.length}
            onPress={() => {
              //Prevent action while scrolling
              if (scaleSharedValue.value === 1) {
                const targetOffset =
                  index * (dateBoxWidth + dateBoxMargin) -
                  (dateBoxMargin + dateBoxWidth) * 2;
                flatListRef.current?.scrollToOffset({
                  offset: targetOffset,
                  animated: true,
                });
              }
            }}
          />
        )}
        keyExtractor={(item) => item.toString()}
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: 10,
          height: 100,
          paddingVertical: 10,
        }}
        className="-scale-x-100"
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={dateBoxWidth + dateBoxMargin}
        decelerationRate="fast"
        onScroll={scrollHandler}
        scrollEventThrottle={32}
        onMomentumScrollEnd={(event) => {
          const contentOffsetX = event.nativeEvent.contentOffset.x;
          const currentIndex = Math.round(
            contentOffsetX / (dateBoxWidth + dateBoxMargin),
          );
          const currentDay = dates[currentIndex + 2];
          onDateChange?.(currentDay);
        }}
      />
    </View>
  );
};

export default DatePickerSlider;
