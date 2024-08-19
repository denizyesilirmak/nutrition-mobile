import { Ionicons } from "@expo/vector-icons";
import { clamp } from "lodash";
import { Alert, Pressable, Text, View } from "react-native";
import Button from "../Button";
import { useState } from "react";
import useMe from "@/src/query/hooks/useMe";

const BOUNDS = {
  min: 35,
  max: 174,
};

const NumberSelector = () => {
    const { me, updateMe } = useMe();
    const [value, setValue] = useState(me?.weight || 0);

  const handleWeightUpdate = () => {
    Alert.alert(
      "Update Weight",
      `Are you sure you want to update your weight to ${value} kg?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await updateMe({ weight: value });
          },
        },
      ],
    );
  };

  return (
    <View className="flex-col items-center justify-center gap-4 space-x-4 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
      <View className="flex-row items-center justify-center">
        <Pressable
          className="flex-1 items-center justify-center rounded-md bg-slate-600 p-2 dark:bg-slate-700"
          onPress={() => setValue(clamp(value - 1, BOUNDS.min, BOUNDS.max))}
        >
          <Ionicons name="remove" size={24} color="white" />
        </Pressable>
        <View className="flex-1 items-center justify-center">
          <Text className="text-2xl font-bold color-slate-900 dark:color-slate-100">
            {value} <Text className="text-base">kg</Text>
          </Text>
        </View>
        <Pressable
          className="flex-1 items-center justify-center rounded-md bg-slate-600 p-2 dark:bg-slate-700"
          onPress={() => setValue(clamp(value + 1, BOUNDS.min, BOUNDS.max))}
        >
          <Ionicons name="add" size={24} color="white" />
        </Pressable>
      </View>
      <Button label="Update Weight" onPress={handleWeightUpdate} />
    </View>
  );
};

export default NumberSelector;
