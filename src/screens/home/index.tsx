import DailyTips from "@/src/components/DailyTips";
import Dashboard from "@/src/components/Dashboard";
import DatePicker from "@/src/components/DatePicker";
import HomeMealInput from "@/src/components/HomeMealInput.tsx";
import ScreenView from "@/src/components/ScreenView";
import { Text } from "react-native";

const Home = () => {
  return (
    <ScreenView scrollable>
      <DatePicker />
      <Text className="px-6 py-3 text-xl font-semibold color-slate-900">
        Overview
      </Text>
      <Dashboard />
      <Text className="px-6 py-3 text-xl font-semibold color-slate-900">
        Add Meal
      </Text>
      <HomeMealInput />
      <Text className="px-6 py-3 text-xl font-semibold color-slate-900">
        Daily Tips
      </Text>
      <DailyTips />
    </ScreenView>
  );
};

export default Home;
