import OptionSelector from "@/src/components/OptionSelector";
import TabSelector from "@/src/components/TabSelector";
import { format, formatDistance } from "date-fns";
import { useState } from "react";
import { View } from "react-native";
import useDateRange from "./utils/dateNavigator";
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
  const [selectedTab, setSelectedTab] =
    useState<selectedTabType["mode"]>("weekly");

  const { startDate, endDate, next, prev, days } = useDateRange(selectedTab);

  return (
    <View className="flex-1 p-4">
      <TabSelector
        onChange={(tab) => {
          setSelectedTab(tab);
        }}
        selectedTab={selectedTab}
      />
      <OptionSelector
        value={{
          label: formatDate({
            startDate: startDate,
            endDate: endDate,
            mode: selectedTab,
          }),
          value: new Date().toISOString(),
        }}
        onPressBack={() => {
          prev();
        }}
        onPressForward={() => {
          next();
        }}
      />
      {selectedTab === "monthly" && (
        <Heatmap
          month={startDate.getMonth() + 1}
          year={startDate.getFullYear()}
        />
      )}
      {selectedTab === "weekly" && (
        <WeeklyChart
          dateRange={{
            start: startDate,
            end: endDate,
          }}
        />
      )}
    </View>
  );
};

export default MealHistory;
