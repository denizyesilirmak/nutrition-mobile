import { fetchSummary } from "@/src/utils/services";
import { useQuery } from "@tanstack/react-query";

interface DataEntry {
  date: string;
  fat: number;
  protein: number;
  carbonhydrate: number;
}

interface MacroData {
  fat: number;
  protein: number;
  carbonhydrate: number;
  percentageFat: number;
  percentageProtein: number;
  percentageCarbonhydrate: number;
}

function convertData(dataArray: DataEntry[]): { [date: string]: MacroData } {
  const result: { [date: string]: MacroData } = {};

  if (!dataArray) {
    return result;
  }

  dataArray.forEach((entry) => {
    const totalMacros = entry.fat + entry.protein + entry.carbonhydrate;

    const percentageFat = (entry.fat / totalMacros) * 100;
    const percentageProtein = (entry.protein / totalMacros) * 100;
    const percentageCarbonhydrate = (entry.carbonhydrate / totalMacros) * 100;

    result[entry.date] = {
      fat: entry.fat,
      protein: entry.protein,
      carbonhydrate: entry.carbonhydrate,
      percentageFat: parseFloat(percentageFat.toFixed(2)),
      percentageProtein: parseFloat(percentageProtein.toFixed(2)),
      percentageCarbonhydrate: parseFloat(percentageCarbonhydrate.toFixed(2)),
    };
  });

  return result;
}

const useSummary = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["summary", startDate, endDate],
    queryFn: () => fetchSummary(startDate, endDate),
    //never cache the summary
    staleTime: 0,
  });

  const summaryObject = convertData(data);

  return {
    summary: summaryObject as Record<string, MacroData> | undefined,
    error,
    isLoading,
  };
};

export default useSummary;
