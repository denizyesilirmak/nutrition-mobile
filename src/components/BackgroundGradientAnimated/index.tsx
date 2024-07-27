import React from "react";
import { View } from "react-native";
import { Canvas, Circle } from "@shopify/react-native-skia";

const BackgroundGradientAnimated = () => {
  return (
    <View className="flex-1">
      <Canvas style={{ flex: 1 }}>
        <Circle cx={150} cy={150} r={150} color={"red"} />
      </Canvas>
    </View>
  );
};

export default BackgroundGradientAnimated;
