import DailyTips from "@/src/components/DailyTips";
import Dashboard, { DashboardProps } from "@/src/components/Dashboard";
import DatePicker from "@/src/components/DatePicker";
import HomeMealInput from "@/src/components/HomeMealInput.tsx";
import ScreenView from "@/src/components/ScreenView";
import { useEffect, useState } from "react";
import { Text } from "react-native";

const dummyData = {
  eaten: 1850,
  burned: 200,
  target: 2000,
  carbs: {
    current: 200,
    target: 300,
  },
  protein: {
    current: 100,
    target: 150,
  },
  fat: {
    current: 50,
    target: 70,
  },
  tard: {
    current: 10,
    target: 450,
  },
  horseshit: {
    current: 10,
    target: 123,
  },
  tomato: {
    current: 10,
    target: 200,
  },
};

const Home = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    console.log("update");
    //randomize data
    dummyData.eaten = Math.floor(Math.random() * 1850);
    dummyData.burned = Math.floor(Math.random() * dummyData.burned);
    dummyData.carbs.current = Math.floor(Math.random() * dummyData.carbs.target);
    dummyData.protein.current = Math.floor(Math.random() * dummyData.protein.target);
    dummyData.fat.current = Math.floor(Math.random() * dummyData.fat.target);
    dummyData.tard.current = Math.floor(Math.random() * dummyData.tard.target);
    dummyData.horseshit.current = Math.floor(Math.random() * dummyData.horseshit.target);
    dummyData.tomato.current = Math.floor(Math.random() * dummyData.tomato.target);
  });

  return (
    <ScreenView scrollable>
      <DatePicker onDateChange={(date) => setDate(date)} />
      <Text className="px-6 py-3 text-lg font-semibold color-slate-900">
        Overview
      </Text>
      <Dashboard data={dummyData} />
      <Text className="px-6 py-3 text-lg font-semibold color-slate-900">
        Add Meal
      </Text>
      <HomeMealInput />
      <Text className="px-6 py-3 text-lg font-semibold color-slate-900">
        Daily Tips
      </Text>
      <DailyTips />
    </ScreenView>
  );
};

export default Home;
