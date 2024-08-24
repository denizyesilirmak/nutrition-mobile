import { Pressable, Text, View } from "react-native";

type TabSelectorProps = {
  onChange: (tab: "daily" | "weekly" | "monthly") => void;
  selectedTab: "daily" | "weekly" | "monthly";
};

const TabSelector = ({ onChange, selectedTab }: TabSelectorProps) => {
  return (
    <View className="flex flex-row justify-between gap-2">
      <Pressable
        onPress={() => onChange("daily")}
        className={`flex-1 items-center justify-center rounded-xl border border-gray-300 p-2 py-4 transition-colors duration-500 dark:border-gray-600 ${
          selectedTab === "daily" ? "bg bg-green-500 dark:bg-lime-500" : ""
        }`}
      >
        <Text className="font-semibold text-black dark:text-white">Daily</Text>
      </Pressable>

      <Pressable
        onPress={() => onChange("weekly")}
        className={`flex-1 items-center justify-center rounded-xl border border-gray-300 p-2 py-4 transition-colors duration-500 dark:border-gray-600 ${
          selectedTab === "weekly" ? "bg bg-green-500 dark:bg-lime-500" : ""
        }`}
      >
        <Text className="font-semibold text-black dark:text-white">Weekly</Text>
      </Pressable>

      <Pressable
        onPress={() => onChange("monthly")}
        className={`flex-1 items-center justify-center rounded-xl border border-gray-300 p-2 py-4 transition-colors duration-500 dark:border-gray-600 ${
          selectedTab === "monthly" ? "bg bg-green-500 dark:bg-lime-500" : ""
        }`}
      >
        <Text className="font-semibold text-black dark:text-white">
          Monthly
        </Text>
      </Pressable>
    </View>
  );
};

export default TabSelector;
