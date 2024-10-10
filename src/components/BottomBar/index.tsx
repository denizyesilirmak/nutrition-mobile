import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useIsFetching } from "@tanstack/react-query";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const BottomBar = (props: BottomTabBarProps) => {
  const { state, descriptors, navigation } = props;
  const { width } = useWindowDimensions();

  const fetching = useIsFetching();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring((width / state.routes.length) * state.index, {
            damping: 10,
            stiffness: 90,
          }),
        },
      ],
    };
  });

  const loadingAnimationStyle = useAnimatedStyle(() => {
    if (!fetching) {
      return {
        opacity: 1,
      };
    }

    return {
      opacity: withRepeat(
        withSequence(
          withTiming(0, {
            duration: 100,
            easing: Easing.linear,
          }),
          withTiming(1, {
            duration: 100,
            easing: Easing.linear,
          }),
        ),
        5,
        true,
      ),
    };
  }, [fetching]);

  return (
    <>
      <SafeAreaView edges={["bottom"]}>
        <View className="h-16 flex-row border-t border-gray-100 bg-white dark:border-gray-600 dark:bg-black">
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];

            const isFocused = state.index === index;
            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <Pressable
                key={route.key}
                className={`flex-1 items-center justify-center`}
                onPress={onPress}
              >
                {options.tabBarIcon ? (
                  <options.tabBarIcon
                    color="red"
                    size={16}
                    focused={isFocused}
                  />
                ) : null}
                <Text
                  className={`text-xs font-semibold ${
                    isFocused
                      ? "text-green-600 dark:text-lime-400"
                      : "text-black dark:text-white"
                  } ${fetching ? "opacity-50" : ""}`}
                >
                  {options.title}
                </Text>
              </Pressable>
            );
          })}
          <View
            pointerEvents="none"
            className="absolute bottom-0 h-1 w-full bg-transparent"
          >
            <Animated.View
              className="bg-green-500 dark:bg-lime-500"
              style={[
                {
                  position: "absolute",
                  width: "25%",
                  height: 3,
                },
                animatedStyle,
                loadingAnimationStyle,
              ]}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default BottomBar;
