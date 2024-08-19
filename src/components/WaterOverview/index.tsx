import useWater from "@/src/query/hooks/useWater";
import { format } from "date-fns";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

type WaterOverviewProps = {};

const FilledWater = () => (
  <Image
    source={require("../../assets/images/water-filled.png")}
    className="h-16 flex-1"
  />
);

const EmptyWater = () => (
  <Image
    source={require("../../assets/images/water-empty.png")}
    className="h-16 flex-1"
  />
);

const WaterOverview = () => {
  const { water, isError, isLoading } = useWater({
    date: format(new Date(), "yyyy-MM-dd"),
  });

  const consumed = Math.ceil(water?.daily_total ? water.daily_total / 250 : 0);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const array = new Array(8).fill({
    consumed: false,
  });

  return (
    <Pressable
      onPress={() => {
        router.push("(auth)/(home)/addWater");
      }}
      className="overflow-hidden rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
    >
      <View className="flex-row justify-between">
        {array.map((_, index) =>
          index < consumed ? (
            <FilledWater key={index} />
          ) : (
            <EmptyWater key={index} />
          ),
        )}
      </View>
    </Pressable>
  );
};

export default WaterOverview;
