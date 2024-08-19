import { Button, View } from "react-native";
import Heatmap from "../components/Heatmap";
import { useState } from "react";
import NumberSelector from "../components/NumberSelector";
import { set } from "date-fns";

const Components = () => {
  const [month, setMonth] = useState(8);
  const [number, setNumber] = useState(40);

  return (
    <View className="flex-1 pt-4">
      {/* <Button title="Next Month" onPress={() => setMonth(month + 1)} />
      <Button title="Previous Month" onPress={() => setMonth(month - 1)} />
      <Heatmap
        year={2024}
        month={month}
        onPressDate={(date) => console.log(date)}
      /> */}
      <NumberSelector
        postfix="kg"
        value={number}
        onChange={setNumber}
        min={30}
        max={120}
      />
    </View>
  );
};

export default Components;
