import OptionSelector from "@/src/components/OptionSelector";
import TabSelector from "@/src/components/TabSelector";
import { useEffect, useState } from "react";
import { View } from "react-native";
import DateNavigator from "./utils/DateNavigator";
import { set } from "date-fns";

const dateNavigator = new DateNavigator("weekly");

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
          label: currentRange.start + " - " + currentRange.end,
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
