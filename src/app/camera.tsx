import { StyleSheet, Text, View } from "react-native";
import {
  Camera,
  useFrameProcessor,
  useCameraDevice,
  useCameraPermission,
  useCameraFormat,
} from "react-native-vision-camera";
import { useTensorflowModel } from "react-native-fast-tflite";
import { useResizePlugin } from "vision-camera-resize-plugin";
import { labels } from "../assets/labels";
import { useEffect, useState } from "react";
import { useRunOnJS } from "react-native-worklets-core";

const CameraScreen = () => {
  const [food, setFood] = useState("Food");

  const device = useCameraDevice("back");

  const permission = useCameraPermission();

  const format = useCameraFormat(device, [
    {
      videoResolution: { width: 1920, height: 1080 },
    },
  ]);

  useEffect(() => {
    if (permission.hasPermission === false) {
      permission.requestPermission();
    }
  }, [permission]);

  const objectDetection = useTensorflowModel(
    require("../assets/aiyfood.tflite"),
  );
  const model =
    objectDetection.state === "loaded" ? objectDetection.model : undefined;

  const { resize } = useResizePlugin();

  const foodDetected = useRunOnJS(
    (food) => {
      setFood(food);
    },
    [food],
  );

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
      const results = Object.entries(outputs[0]).filter(
        ([key, value]) => value > 100,
      );

      let max = results.reduce(
        (prev, current) => {
          return prev[1] > current[1] ? prev : current;
        },
        [0, 0],
      );
      if (labels[max[0]] !== undefined && labels[max[0]] !== "__background__") {
        console.log(labels[max[0]], max[1] / 255);
        if (food !== labels[max[0]]) {
          foodDetected(labels[max[0]]);
        }
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
    <View
      style={{
        backgroundColor: "hotpink",
        flex: 1,
      }}
    >
      <Camera
        format={format}
        frameProcessor={frameProcessor}
        device={device}
        isActive
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          flex: 1,
        }}
      />
      <View
        style={
          (StyleSheet.absoluteFill,
          {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          })
        }
      >
        <Text
          style={{
            color: "white",
            fontSize: 24,
            zIndex: 100,
          }}
        >
          {food}
        </Text>
      </View>
    </View>
  );
};

export default CameraScreen;
