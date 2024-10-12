import ScreenView from "@/src/components/ScreenView";
import { StyleSheet, View } from "react-native";
import {
  CameraDevice,
  Camera as VisionCamera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";

const styles = StyleSheet.create({
  cameraStyle: {
    width: "100%",
    height: "100%",
    backgroundColor: "red",
    aspectRatio: 16 / 9,
  },
});

const CameraWrapper = ({
  hasPermission,
  devices,
}: {
  hasPermission: boolean;
  devices: CameraDevice[];
}) => {
  if (!hasPermission) {
    return <View style={styles.cameraStyle} />;
  }
  if (devices.length === 0) {
    return <View style={styles.cameraStyle} />;
  }

  return (
    <VisionCamera
      style={styles.cameraStyle}
      device={devices[0]}
      isActive={true}
    />
  );
};

const Camera = () => {
  const device = useCameraDevice("back");
  const { hasPermission, requestPermission } = useCameraPermission();

  if (!hasPermission) {
    requestPermission();
  }

  return (
    <ScreenView>
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <View className="flex-1 items-center justify-center bg-white dark:bg-black">
          <CameraWrapper
            hasPermission={hasPermission}
            devices={device ? [device] : []}
          />
        </View>
      </View>
    </ScreenView>
  );
};

export default Camera;
