import { labels } from "@/src/assets/labels";
import { useFoodDetectSessionActions } from "@/src/store/foodDetectSession";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useTensorflowModel } from "react-native-fast-tflite";
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
  useFrameProcessor,
} from "react-native-vision-camera";
import { useRunOnJS, useSharedValue } from "react-native-worklets-core";
import { useResizePlugin } from "vision-camera-resize-plugin";

const FoodDetector = () => {
  const device = useCameraDevice("back");

  const permission = useCameraPermission();

  const { add, reset } = useFoodDetectSessionActions();

  const format = useCameraFormat(device, [
    {
      videoResolution: { width: 720, height: 720 },
    },
  ]);

  useEffect(() => {
    reset();
    if (permission.hasPermission === false) {
      permission.requestPermission();
    }
  }, [permission]);

  const objectDetection = useTensorflowModel(
    require("../../assets/aiyfood.tflite"),
  );
  const model =
    objectDetection.state === "loaded" ? objectDetection.model : undefined;

  const { resize } = useResizePlugin();

  const onFoodDetected = useRunOnJS((food) => {
    add(food);
  }, []);

  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";
      if (model == null) return;

      const resized = resize(frame, {
        scale: {
          width: 192,
          height: 192,
        },
        pixelFormat: "rgb",
        dataType: "uint8",
      });

      const outputs = model.runSync([resized]);
      const results = Object.entries(outputs[0])
        .filter(([key, value]) => value > 100)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

      const detectedFood = results.map(([key, value]) => ({
        label: labels[key],
        confidence: value / 255,
      }));

      if (detectedFood.length > 0) {
        onFoodDetected(detectedFood);
      }
    },
    [model],
  );

  if (device == null) {
    return (
      <View>
        <Text>Camera not available</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-400">
      <Camera
        format={format}
        frameProcessor={frameProcessor}
        device={device}
        focusable
        isActive
        style={{
          position: "absolute",
          width: "100%",
          aspectRatio: 1,
          flex: 1,
        }}
      />
    </View>
  );
};

export default FoodDetector;
