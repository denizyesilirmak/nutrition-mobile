import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

const HomeMealInput = () => {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <View
        className="flex-coll w-full items-center justify-around gap-2 rounded-3xl bg-white p-4"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        }}
      >
        <Pressable className="flex-1 flex-row items-center justify-center rounded-md bg-blue-50 px-2 py-3">
          <View className="flex-1 flex-row items-center justify-start">
            <Ionicons name="beer-outline" size={22} color="darkblue" />
            <Text className="text-l px-2 font-medium color-gray-500">
              Breakfast
            </Text>
          </View>
          <Ionicons name="add-outline" size={18} color="black" />
        </Pressable>

        <Pressable className="flex-1 flex-row items-center justify-center rounded-md bg-green-50 px-2 py-3">
          <View className="flex-1 flex-row items-center justify-start">
            <Ionicons name="fast-food-outline" size={22} color="darkgreen" />
            <Text className="text-l px-2 font-medium color-gray-500">
              Lunch
            </Text>
          </View>
          <Ionicons name="add-outline" size={18} color="black" />
        </Pressable>

        <Pressable className="flex-1 flex-row items-center justify-center rounded-md bg-red-50 px-2 py-3">
          <View className="flex-1 flex-row items-center justify-start">
            <Ionicons name="pizza-outline" size={22} color="darkred" />
            <Text className="text-l px-2 font-medium color-gray-500">
              Dinner
            </Text>
          </View>
          <Ionicons name="add-outline" size={18} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

export default HomeMealInput;
