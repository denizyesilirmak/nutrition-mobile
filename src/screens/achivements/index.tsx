import { router } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

const DUMMY_BADGES = [
  {
    title: "First Steps",
    description: "For logging your first meal",
    earned: true,
    image: require("@/src/assets/images/badges/badge-icon-1.png"),
  },
  {
    title: "Consistency",
    description: "For logging meals every day for a week",
    earned: true,
    image: require("@/src/assets/images/badges/badge-icon-2.png"),
  },
  {
    title: "Habit Hero",
    description: "For maintaining a healthy eating habit for a month",
    earned: true,
    image: require("@/src/assets/images/badges/badge-icon-3.png"),
  },
  {
    title: "Streak Star",
    description:
      "For logging meals daily for a specific streak, like 7 days, 14 days, etc.",
    earned: false,
    image: require("@/src/assets/images/badges/badge-icon-4.png"),
  },
  {
    title: "Mindful Eater",
    description: "For logging meals mindfully for a week",
    earned: true,
    image: require("@/src/assets/images/badges/badge-icon-5.png"),
  },
  {
    title: "Hydration",
    description: "For tracking water intake regularly",
    earned: false,
    image: require("@/src/assets/images/badges/badge-icon-6.png"),
  },
  {
    title: "Log Lover",
    description: "For entering food logs consistently for a month",
    earned: true,
    image: require("@/src/assets/images/badges/badge-icon-7.png"),
  },
  {
    title: "Pound Smasher",
    description: "For losing your first pound",
    earned: false,
    image: require("@/src/assets/images/badges/badge-icon-8.png"),
  },
  {
    title: "Weight Warrior",
    description:
      "For losing 5, 10, or 20 pounds (create a series of badges for different milestones)",
    earned: false,
    image: require("@/src/assets/images/badges/badge-icon-9.png"),
  },
  {
    title: "Goal Getter",
    description: "For reaching a personal weight loss goal",
    earned: false,
    image: require("@/src/assets/images/badges/badge-icon-10.png"),
  },
  {
    title: "Slim Success",
    description: "For reaching your halfway weight loss point",
    earned: false,
    image: require("@/src/assets/images/badges/badge-icon-11.png"),
  },
  {
    title: "Transformation Titan",
    description: "For losing 50 pounds or more",
    earned: false,
    image: require("@/src/assets/images/badges/badge-icon-12.png"),
  },
  {
    title: "Green Guru",
    description: "For consistently consuming vegetables",
    earned: false,
    image: require("@/src/assets/images/badges/badge-icon-13.png"),
  },
  {
    title: "Protein Pro",
    description: "For meeting protein intake goals consistently",
    earned: false,
    image: require("@/src/assets/images/badges/badge-icon-14.png"),
  },
  {
    title: "Balanced Bite",
    description: "For maintaining a balanced diet over a week",
    earned: false,
    image: require("@/src/assets/images/badges/badge-icon-15.png"),
  },
  {
    title: "Fiber Fanatic",
    description: "For hitting fiber goals regularly",
    earned: false,
    image: require("@/src/assets/images/badges/badge-icon-16.png"),
  },
  {
    title: "Carb Conqueror",
    description: "For managing carbohydrate intake effectively",
    earned: false,
    image: require("@/src/assets/images/badges/badge-icon-17.png"),
  },
  // ... rest of the badges
];

const Badge = (badge: {
  title: string;
  description: string;
  earned: boolean;
  image: any;
  width: number;
}) => {
  const badgeWidth = (badge.width - 4 * 16) / 3;
  return (
    <Pressable
      className={`mb-4 h-32 items-center justify-center rounded-lg bg-gray-100 p-2 dark:bg-gray-800`}
      style={{
        width: badgeWidth,
        marginHorizontal: 8,
      }}
      onPress={() => {
        router.push("/details");
      }}
    >
      <View className="items-center justify-center pt-2">
        <View
          className="rounded-full bg-opacity-5 p-2"
          style={{
            backgroundColor: badge.earned ? "#ffffff50" : "#00000000",
            opacity: badge.earned ? 1 : 0.3,
          }}
        >
          <Image
            source={badge.image}
            className="h-14 w-14"
            resizeMode="stretch"
          />
        </View>
      </View>
      <View className="flex-1 items-center justify-end">
        <Text
          className="text-center text-xs font-semibold text-black dark:text-white"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {badge.title}
        </Text>
      </View>
    </Pressable>
  );
};

const Achievements = () => {
  const { width } = useWindowDimensions();

  return (
    <View className="bg-red flex-1">
      <Text className="mb-4 ml-4 text-xl font-semibold text-black dark:text-white">
        My Achievements 🏆
      </Text>
      <View className="h-32 w-full">
        <FlatList
          data={DUMMY_BADGES.filter((badge) => badge.earned)}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => <Badge {...item} width={width} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="px-2"
        />
      </View>
      <View className="flex-1">
        <Text className="my-4 ml-4 text-xl font-semibold text-black dark:text-white">
          Upcoming Badges 🎯
        </Text>
        <FlatList
          data={DUMMY_BADGES.filter((badge) => !badge.earned)}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => <Badge {...item} width={width} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          contentContainerClassName="px-2"
        />
      </View>
    </View>
  );
};

export default Achievements;
