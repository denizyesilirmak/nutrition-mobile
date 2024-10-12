import { Datum } from "@/src/query/hooks/useFoodSearch";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Image from "../Image";
import { Image as RNImage } from "react-native";

import EnergyIcon from "@/src/assets/icons/energy.png";
import CarbsIcon from "@/src/assets/icons/carb.png";
import FatIcon from "@/src/assets/icons/fat.png";
import ProteinIcon from "@/src/assets/icons/protein.png";

const IconColors = {
  energy: "red",
  protein: "tomato",
  carbonhydrate: "green",
  fat: "orange",
} as const;

const FoodListItem = ({ food }: { food: Datum }) => {
  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/foodDetail",
          params: {
            foodId: food.id,
          },
        });
      }}
      className="w-full bg-white p-2 py-1 dark:bg-black"
    >
      <View className="flex-1 rounded-xl bg-gray-100 p-2 dark:bg-gray-800">
        <View className="mb-2 flex-row">
          <Image
            source={{ uri: food.image }}
            style={{ width: 60, height: 60, borderRadius: 4 }}
          />
          <View className="pl-2 pt-1">
            <Text
              numberOfLines={1}
              className="text-md mb-1 font-semibold color-black dark:color-white"
            >
              {food.name}
            </Text>
            <Text className="text-sm text-gray-500">Food detail text</Text>
          </View>
        </View>
        <View className="border-b border-gray-200 dark:border-gray-700" />
        <View className="mt-2 flex-row justify-between px-2">
          <View className="flex-row items-center">
            <RNImage
              source={EnergyIcon}
              className="mr-1 h-4 w-4"
              tintColor={IconColors.energy}
            />
            <Text className="text-xs color-black dark:color-white">
              Cal:
              <Text className="text-xs font-semibold color-black dark:color-white">
                {food.energy}
              </Text>
              cal
            </Text>
          </View>

          <View className="flex-row items-center">
            <RNImage
              source={ProteinIcon}
              className="mr-1 h-4 w-4"
              tintColor={IconColors.protein}
            />
            <Text className="text-xs color-black dark:color-white">
              Protein:
              <Text className="text-xs font-semibold color-black dark:color-white">
                {food.protein}
              </Text>
              g
            </Text>
          </View>

          <View className="flex-row items-center">
            <RNImage
              source={CarbsIcon}
              className="mr-1 h-4 w-4"
              tintColor={IconColors.carbonhydrate}
            />
            <Text className="text-xs color-black dark:color-white">
              Carbs:
              <Text className="text-xs font-semibold color-black dark:color-white">
                {food.carbonhydrate}
              </Text>
              g
            </Text>
          </View>

          <View className="flex-row items-center">
            <RNImage
              source={FatIcon}
              className="mr-1 h-4 w-4"
              tintColor={IconColors.fat}
            />
            <Text className="text-xs color-black dark:color-white">
              Fat:
              <Text className="text-xs font-semibold color-black dark:color-white">
                {food.fat}
              </Text>
              g
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default FoodListItem;
