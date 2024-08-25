import ScreenView from "@/src/components/ScreenView";
import Table from "@/src/components/Table";
import useFoodDetails from "@/src/query/hooks/useFoodDetails";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import { Text, View } from "react-native";
import { Defs, LinearGradient, Rect, Stop, Svg } from "react-native-svg";

const FoodDetail = () => {
  const { colorScheme } = useColorScheme();
  const stopColor = colorScheme === "dark" ? "#000000" : "#ffffff";

  const { foodId } = useLocalSearchParams<{ foodId: string }>();
  const { foodDetails, isLoading } = useFoodDetails(foodId);

  return (
    <ScreenView>
      <View className="h-80 items-center">
        <Image
          source={{
            uri: foodDetails?.highResImage,
          }}
          style={{ width: "100%", height: "100%", position: "absolute" }}
          transition={{
            duration: 300,
            effect: "cross-dissolve",
          }}
        />
        <Svg
          width="100%"
          height="200"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute"
        >
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={stopColor} stopOpacity="1" />
              <Stop offset="0.1" stopColor={stopColor} stopOpacity="1" />
              <Stop offset="0.4" stopColor={stopColor} stopOpacity="0.5" />
              <Stop offset="1" stopColor={stopColor} stopOpacity="0" />
            </LinearGradient>
          </Defs>

          <Rect x="0" y="0" width="100" height="100" fill="url(#grad)" />
        </Svg>
        <Text className="absolute py-4 text-lg font-semibold text-black dark:text-gray-100 z-10">
          {foodDetails?.foodName} {`\n`}
        </Text>
      </View>
      <View
        className="flex-1 p-4"
        style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
      >
        <Text className="text-lg font-semibold text-black dark:text-white mb-2">
          Macro Nutrients
        </Text>
        <View className="flex flex-row justify-between gap-2">
          <View className="flex-1 items-center justify-center rounded-lg bg-gray-100 p-2 dark:bg-gray-700">
            <Text className="text-xs text-gray-500 dark:text-gray-400">
              Carbs
            </Text>
            <Text className="text-md font-semibold text-black dark:text-white">
              {foodDetails?.carbohydrate || 0} gr
            </Text>
          </View>

          <View className="flex-1 items-center justify-center rounded-lg bg-gray-100 p-2 dark:bg-gray-700">
            <Text className="text-xs text-gray-500 dark:text-gray-400">
              Protein
            </Text>
            <Text className="text-md font-semibold text-black dark:text-white">
              {foodDetails?.protein || 0} gr
            </Text>
          </View>

          <View className="flex-1 items-center justify-center rounded-lg bg-gray-100 p-2 dark:bg-gray-700">
            <Text className="text-xs text-gray-500 dark:text-gray-400">
              Fat
            </Text>
            <Text className="text-md font-semibold text-black dark:text-white">
              {foodDetails?.total_fat || 0} gr
            </Text>
          </View>
        </View>

        <Text className="text-lg font-semibold text-black dark:text-white my-2">
          Others
        </Text>
        <Table
          items={[
            { name: "Energy", value: foodDetails?.energy || 0, unit: "kcal" },
            {
              name: "Sugar",
              value: foodDetails?.sugars_total || 0,
              unit: "gr",
            },
            { name: "Fiber", value: foodDetails?.fiber_total || 0, unit: "gr" },
            { name: "Sodium", value: foodDetails?.sodium || 0, unit: "mg" },
            {
              name: "Cholesterol",
              value: foodDetails?.cholesterol || 0,
              unit: "mg",
            },
            {
              name: "Vitamin A",
              value: foodDetails?.vitamin_a || 0,
              unit: "mg",
            },
            {
              name: "Vitamin C",
              value: foodDetails?.vitamin_c || 0,
              unit: "mg",
            },
            { name: "Calcium", value: foodDetails?.calcium || 0, unit: "mg" },
            { name: "Iron", value: foodDetails?.iron || 0, unit: "mg" },
            {
              name: "Potassium",
              value: foodDetails?.potassium || 0,
              unit: "mg",
            },
            {
              name: "Magnesium",
              value: foodDetails?.magnesium || 0,
              unit: "mg",
            },
            {
              name: "Phosphorus",
              value: foodDetails?.phosphorus || 0,
              unit: "mg",
            },
            { name: "Zinc", value: foodDetails?.zinc || 0, unit: "mg" },
            { name: "Selenium", value: foodDetails?.selenium || 0, unit: "mg" },
            {
              name: "Vitamin E",
              value: foodDetails?.vitamin_e || 0,
              unit: "mg",
            },
            {
              name: "Vitamin K",
              value: foodDetails?.vitamin_k || 0,
              unit: "mg",
            },
            {
              name: "Vitamin D",
              value: foodDetails?.vitamin_d || 0,
              unit: "mg",
            },
            {
              name: "Vitamin B12",
              value: foodDetails?.vitamin_b_12 || 0,
              unit: "mg",
            },
          ]}
        />
      </View>
    </ScreenView>
  );
};

export default FoodDetail;
