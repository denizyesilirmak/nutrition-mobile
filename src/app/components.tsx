import { Button, View } from "react-native";
import Heatmap from "../components/Heatmap";
import { useState } from "react";

const Components = () => {
  const [month, setMonth] = useState(8);

  return (
    <View className="flex-1 pt-4">
      <Button title="Next Month" onPress={() => setMonth(month + 1)} />
      <Button title="Previous Month" onPress={() => setMonth(month - 1)} />
      <Heatmap year={2024} month={month} />
    </View>
  );
};

export default Components;
