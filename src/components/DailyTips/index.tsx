import useDailyTips from "@/src/query/hooks/useDailyTips";
import { useEffect, useRef } from "react";
import { FlatList, Text, View, useWindowDimensions } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const Tip = ({
  title,
  content,
  width,
  pageSVG,
  image,
}: {
  title: string;
  content: string;
  width: number;
  pageSVG: Animated.SharedValue<number>;
  image: string;
}) => {
  return (
    <View
      className="w-full items-start justify-start overflow-hidden p-2"
      style={{ width: width - 40 }}
    >
      <Text className="pb-1 text-xl font-medium color-gray-900 dark:text-white">
        {title}
      </Text>
      <Text className="w-[100%] rounded-2xl text-sm color-gray-800 dark:text-white">
        {content}
      </Text>
    </View>
  );
};

const DailyTipBackground = ({
  image,
  pageSv,
  index,
}: {
  image: string;
  pageSv: Animated.SharedValue<number>;
  index: number;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      pageSv.value,
      [index - 1, index, index + 1],
      [0, 0.2, 0],
      Extrapolation.CLAMP,
    );
    return { opacity };
  }, [pageSv.value]);

  return (
    <Animated.Image
      source={{ uri: image }}
      className="absolute h-full w-full"
      style={[
        animatedStyle,
        {
          width: 120,
          height: 120,
          position: "absolute",
          zIndex: -1,
          transform: [{ scale: 2 }, { rotate: "-25deg" }],
          bottom: 0,
          right: 0,
        },
      ]}
    />
  );
};

const DailyTips = () => {
  const { width } = useWindowDimensions();
  const pageIndexSv = useSharedValue(0.1);
  const flatlistRef = useRef<FlatList>(null);
  const { tips, isLoading } = useDailyTips();

  const actualWidth = width - 70;

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const page = event.contentOffset.x / actualWidth;
    pageIndexSv.value = page;
  });

  // useEffect(() => {
  //   const autoScrollInterval = setInterval(() => {
  //     const currentPageIndex = Math.round(pageIndexSv.value);
  //     const next =
  //       currentPageIndex >= tips.length - 1 ? 0 : currentPageIndex + 1;

  //     flatlistRef.current?.scrollToIndex({
  //       index: next,
  //       animated: true,
  //     });

  //     console.log("Auto scroll to", next);
  //     console.log("Current page index", currentPageIndex);
  //   }, 6000);

  //   return () => {
  //     clearInterval(autoScrollInterval);
  //   };
  // }, [pageIndexSv.value, tips]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex-coll w-full items-center justify-around rounded-xl bg-gray-100 p-2 dark:bg-gray-800">
        <View className="flex-1 flex-row items-center justify-center overflow-hidden">
          <Animated.FlatList
            ref={flatlistRef}
            pagingEnabled
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            horizontal
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            data={tips}
            renderItem={(itemData) => (
              <Tip
                title={itemData.item.title}
                content={itemData.item.content}
                width={width}
                pageSVG={pageIndexSv}
                image={itemData.item.image}
              />
            )}
          />
          {tips?.map((item, index) => (
            <DailyTipBackground
              image={item.image}
              pageSv={pageIndexSv}
              index={index}
              key={index}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default DailyTips;
