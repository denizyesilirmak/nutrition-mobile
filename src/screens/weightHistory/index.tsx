import ScreenView from "@/src/components/ScreenView";
import WeightChart from "@/src/components/WeightChart";
import useMe from "@/src/query/hooks/useMe";
import { format } from "date-fns";
import { Text, View } from "react-native";

const Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="flex rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
      {children}
    </View>
  );
};

const WeightHistory = () => {
  const { me } = useMe();

  const filteredWeightHistory =
    me?.weightHistory
      .filter((a) => a.newWeight > 0 && a.newWeight < 150)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ) || [];

  return (
    <ScreenView padding scrollable>
      <View className="gap-4">
        <Section>
          <Text className="text-lg font-bold text-black dark:text-white">
            Weight History{" "}
          </Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400">
            Your weight history will be displayed here.
          </Text>
        </Section>
        <Section>
          <WeightChart data={filteredWeightHistory} />
        </Section>
        <Section>
          {filteredWeightHistory.map((history) => (
            <View
              key={history.id}
              className="flex flex-row items-center justify-between py-3"
            >
              <Text className="text-md text-black dark:text-white">
                {format(new Date(history.createdAt), "dd.MM.yyyy - ")}
                <Text className="text-gray-500 dark:text-gray-400">
                  {format(new Date(history.createdAt), "HH.mm")}
                </Text>
              </Text>
              <View className="rounded-lg bg-lime-500 p-1 dark:bg-lime-500">
                <Text className="text-md font-semibold color-black dark:color-black">
                  <Text>
                    {history.oldWeight - history.newWeight > 0 ? "↓" : "↑"}
                  </Text>
                  {history.newWeight} <Text className="text-sm">kg</Text>
                </Text>
              </View>
            </View>
          ))}
        </Section>
      </View>
    </ScreenView>
  );
};

export default WeightHistory;
