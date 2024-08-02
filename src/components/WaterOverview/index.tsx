import { router } from "expo-router";
import { Image, Pressable, View } from "react-native";

type WaterOverviewProps = {
  full: number;
  consumed: number;
};

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

const WaterOverview = ({ full, consumed }: WaterOverviewProps) => {
  const array = new Array(full).fill({
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
