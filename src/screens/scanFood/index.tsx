// import FoodDetector from "@/src/components/FoodDetector";
import { useDetectedFoods } from "@/src/store/foodDetectSession";
import { Text, View } from "react-native";

const ScanResult = () => {
  const detectedFoods = useDetectedFoods();

  return (
    <View className="flex-1 bg-red-300">
      {Object.entries(detectedFoods).map(([food, confidence]) => (
        <Text key={food}>
          {food}: {confidence}
        </Text>
      ))}
    </View>
  );
};

const ScanFood = () => {
  return (
    <View className="flex-1">
      {/* <FoodDetector /> */}
      <ScanResult />
    </View>
  );
};

export default ScanFood;
