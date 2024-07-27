import DailyTips from "@/src/components/DailyTips";
import DatePickerSlider from "@/src/components/DatePickerSlider";
import Meals from "@/src/components/Meals";
import Overview from "@/src/components/Overview";
import ScreenView from "@/src/components/ScreenView";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

// const fetchMeals = async () => {
//   const response = await fetch("https://api.example.com/meals");
//   const data = await response.json();
//   return data;
// };

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const total = 2400;
  const consumedCalories = Math.trunc(total - Math.random() * 2400);

  // const {data, isLoading, isError} = useQuery("meals", async () => {

  useEffect(() => {
    const currentDay = selectedDate;
    const previousDay = new Date(currentDay);
    previousDay.setDate(currentDay.getDate() - 1);

    console.log("-------");
    console.log("Selected Date", format(selectedDate, "yyyy-MM-dd"));
    console.log("Previous Day", format(previousDay, "yyyy-MM-dd"));
  }, [selectedDate]);

  return (
    <ScreenView scrollable>
      <DatePickerSlider onDateChange={(date) => setSelectedDate(date)} />
      <View className="p-4 pt-0">
        <Text className="text-lg font-bold text-black dark:text-white">
          Overview
        </Text>
        <Overview consumedCalories={consumedCalories} total={total} />
        <Text className="pt-2 text-lg font-bold text-black dark:text-white">
          Meals
        </Text>
        <Meals />
        <Text className="pt-2 text-lg font-bold text-black dark:text-white">
          Daily Tips
        </Text>
        <DailyTips />
      </View>
    </ScreenView>
  );
};

export default Home;
