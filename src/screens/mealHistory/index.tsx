import TabSelector from "@/src/components/TabSelector";
import { useState } from "react";
import { View } from "react-native";

const MealHistory = () => {
  const [selectedTab, setSelectedTab] = useState<
    "daily" | "weekly" | "monthly"
  >("daily");

  return (
    <View className="flex-1 p-4">
      <TabSelector
        onChange={(tab) => setSelectedTab(tab)}
        selectedTab={selectedTab}
      />
    </View>
  );
};

export default MealHistory;
