import {
  AchievementsIcon,
  FoodsIcon,
  HomeIcon,
  ProfileIcon,
  HomeFilledIcon,
  FoodsFilledIcon,
  AchievementsFilledIcon,
  ProfileFilledIcon,
} from "@/src/assets/icons";
import { useColorScheme } from "nativewind";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ButtonIconMap = {
  "(home)": {
    active: HomeFilledIcon,
    inactive: HomeIcon,
  },
  "(foods)": {
    active: FoodsFilledIcon,
    inactive: FoodsIcon,
  },
  "(achivements)": {
    active: AchievementsFilledIcon,
    inactive: AchievementsIcon,
  },
  "(profile)": {
    active: ProfileFilledIcon,
    inactive: ProfileIcon,
  },
} as const;

const BottomBar = (props: BottomTabBarProps) => {
  const { state, descriptors, navigation } = props;
  const { width } = useWindowDimensions();

  const { colorScheme } = useColorScheme();

  const button = (
    route: (typeof state.routes)[number] & { name: keyof typeof ButtonIconMap },
    index: number,
  ) => {
    const { options } = descriptors[route.key];
    const label =
      options.tabBarLabel !== undefined
        ? options.tabBarLabel
        : options.title !== undefined
          ? options.title
          : route.name;

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
        key={index}
        className="flex-1 items-center justify-center"
        onPress={onPress}
      >
        <Image
          tintColor={colorScheme === "dark" ? "white" : "black"}
          source={ButtonIconMap[route.name][isFocused ? "active" : "inactive"]}
          className="h-8 w-8"
        />
        <Text className="text-xs font-semibold text-black dark:text-white">
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <>
      <SafeAreaView edges={["bottom"]}>
        <View className="h-16 flex-row justify-between border border-b-0 border-l-0 border-r-0 border-gray-200 bg-white dark:border-gray-900 dark:bg-black">
          {state.routes.map((route, index) => button(route, index))}
        </View>
      </SafeAreaView>
    </>
  );
};

export default BottomBar;
