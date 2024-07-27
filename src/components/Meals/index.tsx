import { Pressable, Text, View } from "react-native";
import IconButton from "../IconButton";
import { Ionicons } from "@expo/vector-icons";

const MealHeader = ({
  title,
  calories,
}: {
  title: string;
  calories: number;
}) => {
  return (
    <View className="p flex flex-row items-center justify-between rounded-lg bg-gray-100 px-2 dark:bg-gray-700">
      <Text className="text-black-400 text-md font-semibold dark:text-gray-100">
        {title}{" "}
        <Text className="text-xs text-gray-400 dark:text-gray-300">
          ({calories} cal)
        </Text>
      </Text>
      <IconButton icon={<Ionicons name="add" size={20} />} />
    </View>
  );
};

const MealItem = ({ title, calories }: { title: string; calories: number }) => {
  return (
    <View className="flex flex-row items-center justify-between px-4 py-2">
      <Text className="text-black-400 text-md dark:text-gray-100">{title}</Text>
      <Text className="text-xs text-gray-400 dark:text-gray-300">
        {calories} cal
      </Text>
    </View>
  );
};

const Meals = () => {
  return (
    <View className="overflow-hidden rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
      <MealHeader title="🥞 Breakfast" calories={400} />
      <MealItem title="Banana" calories={100} />
      <MealItem title="Orange Juice" calories={100} />
      <MealHeader title="🥘 Lunch" calories={400} />
      <MealItem title="Salad" calories={200} />
      <MealItem title="Chicken" calories={200} />
      <MealItem title="Rice" calories={100} />
      <MealHeader title="🍲 Dinner" calories={400} />
      <MealItem title="Soup" calories={200} />
      <MealItem title="Salmon" calories={200} />
    </View>
  );
};

export default Meals;
