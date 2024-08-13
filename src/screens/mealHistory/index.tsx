import OptionSelector from "@/src/components/OptionSelector";
import TabSelector from "@/src/components/TabSelector";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { dateNavigator } from "./utils/dateNavigator";
import formatDate from "./utils/formatDate";
import Heatmap from "@/src/components/Heatmap";
import WeeklyChart from "@/src/components/WeeklyChart";

type selectedTabType = {
  mode: "daily" | "weekly" | "monthly";
  dates: {
    start: Date;
    end: Date;
  };
};

const MealHistory = () => {
  const [selectedTab, setSelectedTab] = useState<selectedTabType>({
    mode: "daily",
    dates: dateNavigator.getRange(),
  });

  return (
    <View className="flex-1 p-4">
      <TabSelector
        onChange={(tab) => {
          setSelectedTab({
            mode: tab,
            dates: dateNavigator.getRange(),
          });
          dateNavigator.changeMode(tab);
        }}
        selectedTab={selectedTab.mode}
      />
      <OptionSelector
        value={{
          label: formatDate({
            startDate: selectedTab.dates.start,
            endDate: selectedTab.dates.end,
            mode: selectedTab.mode,
          }),
          value: new Date().toISOString(),
        }}
        onPressBack={() => {
          const test = dateNavigator.prev();
          setSelectedTab({
            mode: selectedTab.mode,
            dates: test,
          });
        }}
        onPressForward={() => {
          const test = dateNavigator.next();
          setSelectedTab({
            mode: selectedTab.mode,
            dates: test,
          });
        }}
      />
      {selectedTab.mode === "monthly" && (
        <Heatmap
          month={selectedTab.dates.start.getMonth() + 1}
          year={selectedTab.dates.start.getFullYear()}
        />
      )}
      {selectedTab.mode === "weekly" && (
        <WeeklyChart dateRange={selectedTab.dates} />
      )}
    </View>
  );
};

export default MealHistory;
