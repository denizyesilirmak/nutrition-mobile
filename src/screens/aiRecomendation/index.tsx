import useMeals from "@/src/query/hooks/useMeals";
import { addDays, format } from "date-fns";
import LottieView from "lottie-react-native";
import { useEffect } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import BlobAnim from "@/src/assets/animations/blob.json";
import Animated, {
  Easing,
  interpolate,
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useLocalSearchParams } from "expo-router";
import useAiRecomendation from "@/src/query/hooks/useAiRecomendation";
import AiRecommendationView from "@/src/components/AiRecomendation";

const MAX_ROTATING_IMAGES = 5;

const RotatingImage = ({
  initialDegree = 0,
  uri,
}: {
  initialDegree?: number;
  uri?: string;
}) => {
  const { width } = useWindowDimensions();
  const boxSize = width - 32;

  const degree = useSharedValue(initialDegree);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${degree.value}deg` }],
    };
  });

  useEffect(() => {
    degree.value = withRepeat(
      withTiming(initialDegree + 360, {
        duration: 3000,
        easing: Easing.linear,
      }),
      -1,
    );
  }, [degree, initialDegree]);

  return (
    <Animated.View
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
          width: boxSize,
          height: boxSize,
          position: "absolute",
          top: 0,
        },
        animatedStyle,
      ]}
    >
      <Animated.Image
        entering={SlideInDown.delay(initialDegree * 4)}
        source={{ uri: uri }}
        style={{
          width: 80,
          height: 80,
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 40,
          marginTop: boxSize - 120,
          backgroundColor: "white",
        }}
      />
    </Animated.View>
  );
};

const AiRecommendation = () => {
  const { width } = useWindowDimensions();
  const boxSize = width - 32;
  const scaleSV = useSharedValue(1);
  const scaleUpSV = useSharedValue(0.7);

  const params = useLocalSearchParams<{ startDate: string; endDate: string }>();

  const { recomendation } = useAiRecomendation({
    date: params.startDate!,
  });

  const { meals } = useMeals({
    startDate: params.startDate!,
    endDate: params.endDate!,
  });

  const arr = Object.entries(meals).flatMap(([mealType, items]) =>
    items.map((item) => ({ ...item, mealType })),
  );

  const scaleDownAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleSV.value }],
    };
  });

  const textFadeInAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scaleSV.value, [0, 1], [0, 1]),
    };
  });

  const scaleUpAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleUpSV.value }],
      opacity: interpolate(scaleUpSV.value, [0.7, 1], [0, 1]),
    };
  });

  useEffect(() => {
    scaleSV.value = withDelay(
      4000,
      withTiming(0, { duration: 300, easing: Easing.out(Easing.ease) }),
    );

    scaleUpSV.value = withDelay(
      5000,
      withTiming(1, { duration: 300, easing: Easing.out(Easing.ease) }),
    );
  }, [scaleSV, scaleUpSV]);

  return (
    <View className="flex-1 justify-center p-4">
      <View
        style={{
          width: boxSize,
          height: boxSize,
          borderRadius: 18,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={[
            {
              width: boxSize,
              height: boxSize,
            },
            scaleDownAnimatedStyle,
          ]}
        >
          <LottieView
            source={BlobAnim}
            autoPlay
            loop
            speed={3}
            style={{
              position: "absolute",
              width: boxSize,
              height: boxSize,
            }}
          />
          {arr.slice(0, MAX_ROTATING_IMAGES).map((item, index) => (
            <RotatingImage
              key={item.id + item.mealType + String(index)}
              initialDegree={index * (360 / MAX_ROTATING_IMAGES)}
              uri={item.lowResImage}
            />
          ))}
        </Animated.View>
      </View>

      <Animated.View className="mt-4" style={textFadeInAnimatedStyle}>
        <Text className="text-center text-xl font-semibold text-black dark:text-white">
          Your AI Recommendation
        </Text>
        <Text className="text-center text-sm text-gray-600 dark:text-gray-400">
          Nutri Guide is generating a personalized meal plan for you.
        </Text>
        <Text className="text-center text-sm text-gray-600 dark:text-gray-400">
          Please wait a moment.
        </Text>
      </Animated.View>

      <Animated.View
        style={[
          {
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 10,
            left: 16,
          },
          scaleUpAnimatedStyle,
        ]}
      >
        <AiRecommendationView date={params.startDate!} />
      </Animated.View>
    </View>
  );
};

export default AiRecommendation;
