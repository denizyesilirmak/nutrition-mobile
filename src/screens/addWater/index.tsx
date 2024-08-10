import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { PanResponder, Pressable, Text, TextInput, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const clamp = (value: number, lowerBound = 0, upperBound = 1) => {
  "worklet";
  return Math.min(Math.max(lowerBound, value), upperBound);
};

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
const AnimatedText = Animated.createAnimatedComponent(TextInput);

const AddWater = () => {
  const glassRatio = useSharedValue(0);
  const glassHeight = useSharedValue(0);
  const bounceShareValue = useSharedValue(1);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event) => {
      const value = clamp(1 - event.nativeEvent.locationY / glassHeight.value);

      glassRatio.value = value;
    },
    onPanResponderRelease: (event) => {
      const value = clamp(1 - event.nativeEvent.locationY / glassHeight.value);
      glassRatio.value = withTiming(value);

      bounceShareValue.value = withSequence(
        withSpring(1.2, {
          damping: 10,
          stiffness: 100,
        }),
        withSpring(1, {
          damping: 3,
          stiffness: 200,
        }),
      );
    },
  });

  const glassFillingProgress = useAnimatedProps(() => {
    return {
      progress: glassRatio.value,
    };
  });

  const AmountTextProp = useAnimatedProps(() => {
    return {
      text: `${Math.round(glassRatio.value * 200)} ml`,
      defaultValue: "0 ml",
    };
  });

  const bounceAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: bounceShareValue.value,
        },
      ],
    };
  });

  return (
    <View className="flex-1 p-4">
      <Text className="text-center text-xl font-bold dark:text-white">
        Water Intake
      </Text>
      <View className="absolute inset-x-0 bottom-0 z-10 flex-1 flex-row items-center justify-center gap-4 pb-4">
        <Animated.View style={[bounceAnimation]}>
          <Pressable
            onPress={() => {
              // glassRatio.value = 0;
              router.back();
            }}
            className="z-30 h-20 w-24 flex-col items-center justify-center rounded-2xl border-2 border-white bg-lime-500 active:bg-lime-400 dark:border-black"
          >
            <AnimatedText
              editable={false}
              className="text-center text-xl font-semibold dark:text-white"
              animatedProps={AmountTextProp}
            />
            <Text className="text-center text-sm font-semibold text-white dark:text-white">
              Add
            </Text>
          </Pressable>
        </Animated.View>
        <Pressable
          onPress={() => {
            glassRatio.value = 1;
          }}
          className="h-20 w-24 flex-col items-center justify-center rounded-2xl border-2 border-white bg-lime-500 active:bg-lime-400 dark:border-black"
        >
          <Text className="text-center text-xl font-semibold text-white dark:text-white">
            Full
          </Text>
        </Pressable>
      </View>
      <View className="p-0">
        <AnimatedLottieView
          {...panResponder.panHandlers}
          source={require("../../assets/animations/water.json")}
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
          onLayout={(event) => {
            // console.log(event.nativeEvent.layout);
            glassHeight.value = event.nativeEvent.layout.height;
          }}
          animatedProps={glassFillingProgress}
        />
      </View>
    </View>
  );
};

export default AddWater;
