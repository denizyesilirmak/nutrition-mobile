import { Image, Pressable, Text, View } from "react-native";
import SweepGradient from "../../assets/images/sweep-gradient.png";
import Animated, {
  BounceIn,
  Easing,
  FadeInUp,
  SlideInDown,
  SlideInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

const AnimatedFloatingButton = () => {
  const buttonSize = 60;

  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }, { scale: 1.5 }],
    };
  });

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
    );
  }, [rotation]);

  return (
    <Animated.View
      entering={SlideInDown.duration(1000).delay(1000).springify()}
      style={{
        position: "absolute",
        zIndex: 2,
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <Pressable
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          width: buttonSize,
          height: buttonSize,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          backgroundColor: "#FF6347",
        }}
      >
        <Animated.Image
          source={SweepGradient}
          style={[
            {
              width: buttonSize,
              height: buttonSize,
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            },
            animatedStyle,
          ]}
        />
        <View
          className="bg-gray-100 dark:bg-black"
          style={{
            position: "absolute",
            zIndex: 1,
            width: buttonSize - 6,
            height: buttonSize - 6,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 18,
          }}
        >
          <Text className="text-black dark:text-white">Nutri</Text>
          <Text className="font-semibold text-black dark:text-white">
            Guide
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default AnimatedFloatingButton;
