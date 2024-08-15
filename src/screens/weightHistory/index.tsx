import ScreenView from "@/src/components/ScreenView";
import WeightChart from "@/src/components/WeightChart";
import { Text, View } from "react-native";

const DUMMY_DATA = [
  {
    date: "2021-01-01",
    weight: 80,
  },
  {
    date: "2021-01-02",
    weight: 82,
  },
  {
    date: "2021-01-03",
    weight: 84,
  },
  {
    date: "2021-01-04",
    weight: 85,
  },
  {
    date: "2021-01-05",
    weight: 86,
  },
  {
    date: "2021-01-06",
    weight: 84,
  },
  {
    date: "2021-01-07",
    weight: 83,
  },
  {
    date: "2021-01-08",
    weight: 80,
  },
  {
    date: "2021-01-09",
    weight: 78,
  },
  {
    date: "2021-01-10",
    weight: 78,
  },
];

const Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="flex rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
      {children}
    </View>
  );
};

const WeightHistory = () => {
  return (
    <ScreenView padding scrollable>
      <View className="gap-4">
        <Section>
          <Text className="text-lg font-bold">Weight History</Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400">
            Your weight history will be displayed here.
          </Text>
        </Section>
        <Section>
          <WeightChart data={DUMMY_DATA} />
        </Section>
        <Section>
          {DUMMY_DATA.map((data, index) => {
            return (
              <View key={index} className="flex-row justify-between py-4">
                <Text>{data.date}</Text>
                <Text>{data.weight}</Text>
              </View>
            );
          })}
        </Section>
      </View>
    </ScreenView>
  );
};

export default WeightHistory;
