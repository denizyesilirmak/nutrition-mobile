import ScreenView from "@/src/components/ScreenView";
import useFoodDetails from "@/src/query/hooks/useFoodDetails";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import {
  Text,
  View,
  Image as RNImage,
  ImageSourcePropType,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Defs, LinearGradient, Rect, Stop, Svg } from "react-native-svg";
import { IconColors } from "@/src/constants/Colors";
import {
  CaffeineIcon,
  CalcuimIcon,
  CarbsIcon,
  CholesterolIcon,
  EnergyIcon,
  FatIcon,
  FiberIcon,
  IronIcon,
  MagnesiumIcon,
  PotassiumIcon,
  ProteinIcon,
  SeleniumIcon,
  SodiumIcon,
  SugarIcon,
  Vitamin_AIcon,
  Vitamin_CIcon,
  Vitamin_DIcon,
  Vitamin_EIcon,
  Vitamin_KIcon,
} from "@/src/assets/icons";
import Animated, { FadeIn } from "react-native-reanimated";
import nutritionInfo from "../nutritionDetail/constants";

const InfoCard = ({
  title,
  value,
  unit,
  icon,
  iconColor,
  delay,
  onPress,
}: {
  title: string;
  value: number;
  unit: string;
  icon: ImageSourcePropType;
  iconColor?: string;
  delay: number;
  onPress?: () => void;
}) => (
  <Animated.View entering={FadeIn.delay(delay)} className="flex-1">
    <Pressable
      onPress={onPress}
      className="items-center justify-center rounded-lg bg-gray-100 p-2 dark:bg-gray-700"
    >
      <RNImage source={icon} className="h-8 w-8" tintColor={iconColor} />
      <View className="items-center justify-center">
        <Text
          numberOfLines={1}
          className="text-xs font-semibold text-gray-500 dark:text-gray-400"
        >
          {title}
        </Text>
        <Text
          numberOfLines={1}
          className="text-lg font-extrabold text-black dark:text-white"
        >
          {value} <Text className="text-xs font-normal">{unit}</Text>
        </Text>
      </View>
    </Pressable>
  </Animated.View>
);

const Row = ({ children }: { children: React.ReactNode }) => (
  <View className="flex flex-row justify-between gap-2">{children}</View>
);

const FoodDetail = () => {
  const { colorScheme } = useColorScheme();
  const stopColor = colorScheme === "dark" ? "#000000" : "#ffffff";

  const { foodId } = useLocalSearchParams<{ foodId: string }>();
  const { foodDetails, isLoading } = useFoodDetails(foodId);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="lime" />
      </View>
    );
  }

  const infoCardData = [
    [
      {
        id: "calories",
        title: "Calories",
        value: foodDetails?.energy!,
        unit: "Cal",
        icon: EnergyIcon,
        iconColor: IconColors.energy,
        color: "#FFDDC1", // Pastel Orange
        darkColor: "#FFABAB", // Light Red
      },
      {
        id: "protein",
        title: "Protein",
        value: foodDetails?.protein!,
        unit: "g",
        icon: ProteinIcon,
        iconColor: IconColors.protein,
        color: "#C1E1FF", // Pastel Blue
        darkColor: "#A0D6E3", // Light Cyan
      },
      {
        id: "carbs",
        title: "Carbs",
        value: foodDetails?.carbohydrate!,
        unit: "g",
        icon: CarbsIcon,
        iconColor: IconColors.carbonhydrate,
        color: "#FFECBC", // Pastel Yellow
        darkColor: "#FFE8A1", // Light Lemon
      },
      {
        id: "fat",
        title: "Fat",
        value: foodDetails?.total_fat!,
        unit: "g",
        icon: FatIcon,
        iconColor: IconColors.fat,
        color: "#C4E1C1", // Pastel Green
        darkColor: "#A8D8B9", // Light Mint
      },
    ],
    [
      {
        id: "sugars",
        title: "Sugars",
        value: foodDetails?.sugars_total!,
        unit: "g",
        icon: SugarIcon,
        color: "#FFB2B2", // Pastel Pink
        darkColor: "#FF8D8D", // Light Coral
      },
      {
        id: "calcium",
        title: "Calcium",
        value: foodDetails?.calcium!,
        unit: "g",
        icon: CalcuimIcon,
        color: "#B2D3FF", // Pastel Light Blue
        darkColor: "#A1C6FF", // Light Sky Blue
      },
      {
        id: "sodium",
        title: "Sodium",
        value: foodDetails?.sodium!,
        unit: "mg",
        icon: SodiumIcon,
        color: "#FFC3B1", // Pastel Peach
        darkColor: "#FFAB91", // Light Apricot
      },
      {
        id: "cholesterol",
        title: "Cholesterol",
        value: foodDetails?.cholesterol!,
        unit: "mg",
        icon: CholesterolIcon,
        color: "#D1C4E9", // Pastel Lavender
        darkColor: "#B39DDB", // Light Purple
      },
      {
        id: "fiber",
        title: "Fiber",
        value: foodDetails?.fiber_total!,
        unit: "g",
        icon: FiberIcon,
        color: "#C8E6C9", // Pastel Mint Green
        darkColor: "#A5D6A7", // Light Lime Green
      },
    ],
    [
      {
        id: "iron",
        title: "Iron",
        value: foodDetails?.iron!,
        unit: "mg",
        icon: IronIcon,
        color: "#FFCCBC", // Pastel Salmon
        darkColor: "#FFAB91", // Light Orange
      },
      {
        id: "magnesium",
        title: "Magnesium",
        value: foodDetails?.magnesium!,
        unit: "mg",
        icon: MagnesiumIcon,
        color: "#B3E5FC", // Pastel Sky Blue
        darkColor: "#81D4FA", // Light Cyan
      },
      {
        id: "caffeine",
        title: "Caffeine",
        value: foodDetails?.caffeine!,
        unit: "mg",
        icon: CaffeineIcon,
        color: "#FFE57F", // Pastel Light Yellow
        darkColor: "#FFD740", // Light Sun Yellow
      },
      {
        id: "potassium",
        title: "Potassium",
        value: foodDetails?.potassium!,
        unit: "mg",
        icon: PotassiumIcon,
        color: "#B2DFDB", // Pastel Aqua
        darkColor: "#80CBC4", // Light Teal
      },
      {
        id: "selenium",
        title: "Selenium",
        value: foodDetails?.selenium!,
        unit: "mg",
        icon: SeleniumIcon,
        color: "#FFABAB", // Pastel Rose
        darkColor: "#FF6F6F", // Light Pink Red
      },
    ],
    [
      {
        id: "vitamin_c",
        title: "Vitamin C",
        value: foodDetails?.vitamin_c!,
        unit: "mg",
        icon: Vitamin_CIcon,
        color: "#C5CAE9", // Pastel Light Blue
        darkColor: "#9FA8DA", // Light Periwinkle
      },
      {
        id: "vitamin_d",
        title: "Vitamin D",
        value: foodDetails?.vitamin_d!,
        unit: "mg",
        icon: Vitamin_DIcon,
        color: "#E1BEE7", // Pastel Lavender Pink
        darkColor: "#D81B60", // Light Fuchsia
      },
      {
        id: "vitamin_k",
        title: "Vitamin K",
        value: foodDetails?.vitamin_k!,
        unit: "mg",
        icon: Vitamin_KIcon,
        color: "#C8E6C9", // Pastel Mint
        darkColor: "#A5D6A7", // Light Green
      },
      {
        id: "vitamin_a",
        title: "Vitamin A",
        value: foodDetails?.vitamin_a!,
        unit: "mg",
        icon: Vitamin_AIcon,
        color: "#FFCCBC", // Pastel Peach
        darkColor: "#FFAB91", // Light Apricot
      },
      {
        id: "vitamin_e",
        title: "Vitamin E",
        value: foodDetails?.vitamin_e!,
        unit: "mg",
        icon: Vitamin_EIcon,
        color: "#D1C4E9", // Pastel Lavender
        darkColor: "#B39DDB", // Light Purple
      },
    ],
  ];

  return (
    <ScreenView scrollable bounces>
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
          height="320"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute"
        >
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={stopColor} stopOpacity="0" />
              <Stop offset="0.1" stopColor={stopColor} stopOpacity="0" />
              <Stop offset="0.5" stopColor={stopColor} stopOpacity="0" />
              <Stop offset="0.9" stopColor={stopColor} stopOpacity="1" />
              <Stop offset="1" stopColor={stopColor} stopOpacity="1" />
            </LinearGradient>
          </Defs>

          <Rect x="0" y="0" width="100" height="100" fill="url(#grad)" />
        </Svg>
        <Text className="absolute -bottom-10 z-10 py-4 text-3xl font-extralight text-black dark:text-gray-100">
          {foodDetails?.foodName} {`\n`}
        </Text>
      </View>
      <View
        className="flex-1 p-4"
        style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
      >
        <Text className="mb-2 text-lg font-semibold text-black dark:text-white">
          Macro Nutrients
        </Text>
        <Row>
          {infoCardData[0].map((card, index) => (
            <InfoCard
              key={index}
              {...card}
              delay={100 + (index + 1) * 100}
              onPress={() => {
                console.log("Navigate to nutrition detail");
                console.log(card.id, foodId);
                router.push({
                  pathname: "/nutritionDetail",
                  params: {
                    foodId,
                    nutrientId: card.id,
                  },
                });
              }}
            />
          ))}
        </Row>

        <Text className="my-2 text-lg font-semibold text-black dark:text-white">
          Detail
        </Text>

        <View className="flex flex-col gap-2 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <Text className="text-sm text-gray-800 dark:text-gray-400">
            {foodDetails?.category_description} {`\n`}
            {foodDetails?.main_food_description}
          </Text>
        </View>

        <Text className="my-2 text-lg font-semibold text-black dark:text-white">
          Others
        </Text>
        <View className="flex flex-col gap-2">
          {infoCardData.slice(1).map((row, index_row) => (
            <Row key={index_row}>
              {row.map((card, index) => (
                <InfoCard
                  onPress={() => {
                    if (!Object.keys(nutritionInfo).includes(card.id)) {
                      return;
                    }

                    router.push({
                      pathname: "/nutritionDetail",
                      params: {
                        foodId,
                        nutrientId: card.id,
                      },
                    });
                  }}
                  key={card.id}
                  {...card}
                  delay={500 + (index + 1) * 100 + (index_row + 1) * 100}
                />
              ))}
            </Row>
          ))}
        </View>
      </View>
    </ScreenView>
  );
};

export default FoodDetail;
