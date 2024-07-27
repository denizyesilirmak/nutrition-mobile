import { useEffect, useRef } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const DUMMY_DAILY_TIPS = [
  {
    title: "Intermittent Fasting",
    image:
      "https://freepng.com/uploads/images/202311/Vector-healthy-food-in-hand-symbol-cartoon-illustration-png_1020x-3870.jpg",
    content:
      "Intermittent fasting is an eating pattern that cycles between periods of fasting and eating. It doesn’t specify which foods you should eat but rather when you should eat them. In this respect, it’s not a diet in the conventional sense but more accurately described as an eating pattern.",
  },
  {
    title: "Eating healthy",
    image:
      "https://i.pinimg.com/originals/71/3d/f0/713df0b2938806d5a68b3bbc8feedf8c.png",
    content:
      "A no-sugar diet is one that omits added sugars. This includes sugars in sweets, desserts, soft drinks, and sugary beverages. A no-sugar diet is often referred to as a sugar-free diet or low-sugar diet.",
  },
  {
    title: "Keto Diet",
    image:
      "https://static.vecteezy.com/system/resources/previews/018/974/363/original/hand-drawn-healthy-food-set-illustration-in-doodle-style-png.png",
    content:
      "The ketogenic diet is a very low-carb, high-fat diet that shares many similarities with the Atkins and low-carb diets. It involves drastically reducing carbohydrate intake and replacing it with fat. This reduction in carbs puts your body into a metabolic state called ketosis.",
  },
];

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

  const actualWidth = width - 70;

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const page = event.contentOffset.x / actualWidth;
    pageIndexSv.value = page;
  });

  useEffect(() => {
    const autoScrollInterval = setInterval(() => {
      const currentPageIndex = Math.round(pageIndexSv.value);
      const next =
        currentPageIndex >= DUMMY_DAILY_TIPS.length - 1
          ? 0
          : currentPageIndex + 1;

      flatlistRef.current?.scrollToIndex({
        index: next,
        animated: true,
      });
    }, 6000);

    return () => {
      clearInterval(autoScrollInterval);
    };
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex-coll w-full items-center justify-around rounded-xl bg-gray-100 p-2 dark:bg-gray-800">
        <View className="flex-1 flex-row items-center justify-center overflow-hidden">
          <Animated.FlatList
            ref={flatlistRef}
            pagingEnabled
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            data={DUMMY_DAILY_TIPS}
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
          {DUMMY_DAILY_TIPS.map((item, index) => (
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
