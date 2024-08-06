import OptionSelector from "@/src/components/OptionSelector";
import TabSelector from "@/src/components/TabSelector";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { dateNavigator } from "./utils/dateNavigator";
import formatDate from "./utils/formatDate";

const MealHistory = () => {
  const [selectedTab, setSelectedTab] = useState<
    "daily" | "weekly" | "monthly"
  >("daily");

  const [currentRange, setCurrentRange] = useState(dateNavigator.getRange());

  useEffect(() => {
    dateNavigator.changeMode(selectedTab);
    setCurrentRange(dateNavigator.getRange());
  }, [selectedTab]);

  return (
    <View className="flex-1 p-4">
      <TabSelector
        onChange={(tab) => setSelectedTab(tab)}
        selectedTab={selectedTab}
      />
      <OptionSelector
        value={{
          label: formatDate({
            startDate: currentRange.start,
            endDate: currentRange.end,
            mode: selectedTab,
          }),
          value: new Date().toISOString(),
        }}
        onPressBack={() => {
          const test = dateNavigator.prev();
          setCurrentRange(test);
        }}
        onPressForward={() => {
          const test = dateNavigator.next();
          setCurrentRange(test);
        }}
      />
    </View>
  );
};

export default MealHistory;
