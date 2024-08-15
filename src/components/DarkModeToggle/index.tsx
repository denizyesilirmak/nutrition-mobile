import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const KNOB_COLORS = {
  dark: ["#ffeeab", "#ffa44a"],
  light: ["#ffffff", "#cccccc"],
};

const DarkModeToggle = ({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
}) => {
  const knobAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(value ? 32 : 4, {
            duration: 200,
          }),
        },
      ],
      backgroundColor: withTiming(
        interpolateColor(
          value ? 0 : 1,
          [0, 1],
          [KNOB_COLORS.light[0], KNOB_COLORS.dark[0]],
        ),
      ),
      borderColor: withTiming(
        interpolateColor(
          value ? 0 : 1,
          [0, 1],
          [KNOB_COLORS.light[1], KNOB_COLORS.dark[1]],
        ),
      ),
    };
  }, [value]);

  const backgroundColorAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        interpolateColor(value ? 1 : 0, [0, 1], ["#ffffff", "#000000"]),
      ),
    };
  }, [value]);

  const sunAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(value ? -32 : 0) }],
    };
  });

  const moonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(value ? 0 : 32) }],
    };
  });

  return (
    <Pressable onPress={() => onChange(!value)}>
      <Animated.View
        className="flex-row items-center justify-between overflow-hidden rounded-full border-gray-200 bg-black dark:border-gray-700"
        style={[
          backgroundColorAnimatedStyle,
          { height: 32, width: 60, paddingHorizontal: 4, borderWidth: 2 },
        ]}
      >
        <Animated.View
          className="absolute rounded-full border-2 bg-white"
          style={[
            knobAnimatedStyle,
            {
              borderColor: "red",
              backgroundColor: "lime",
              height: 20,
              width: 20,
            },
          ]}
        />
        <Animated.View style={moonAnimatedStyle}>
          <Ionicons name="moon" size={20} color="white" />
        </Animated.View>
        <Animated.View style={sunAnimatedStyle}>
          <Ionicons name="sunny" size={20} color="#ffa44a" />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default DarkModeToggle;
