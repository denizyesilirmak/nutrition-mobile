import DaySummaryScreen from "@/src/screens/daySummary";
import { useLocalSearchParams } from "expo-router";

const DaySummary = () => {
  const params = useLocalSearchParams<{ startDate: string; endDate: string }>();

  return (
    <DaySummaryScreen startDate={params.startDate!} endDate={params.endDate!} />
  );
};

export default DaySummary;
