//@refresh reset
import {
  Blur,
  Canvas,
  Circle,
  ColorMatrix,
  Group,
  Paint,
} from "@shopify/react-native-skia";
import { useEffect, useMemo } from "react";
import { Text, View, Pressable } from "react-native";
import {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const BottomNavBarButton = ({ active }: { active?: boolean }) => {
  const yValue = useSharedValue(10);

  useEffect(() => {
    yValue.value = withRepeat(withSequence(withTiming(40), withTiming(10)), -1);
  }, []);

  const layer = useMemo(() => {
    return (
      <Paint>
        <Blur blur={7} />
        <ColorMatrix
          matrix={[
            //R, G, B, A, bias
            //prettier-ignore
            1,
            0,
            0,
            0,
            0, // red
            //prettier-ignore
            0,
            1,
            0,
            0,
            0, // green
            //prettier-ignore
            0,
            0,
            1,
            0,
            0, // blue
            //prettier-ignore
            0,
            0,
            0,
            20,
            -5, // alpha
          ]}
        />
      </Paint>
    );
  }, []);

  return (
    <Pressable className="flex-1 items-center justify-center">
      <Canvas
        style={{
          flex: 1,
          position: "absolute",
          backgroundColor: "transparent",
          width: 50,
          height: 80,
          borderWidth: 1,
          borderColor: "lime",
          bottom: 0,
        }}
      >
        <Group layer={layer}>
          <Circle cx={25} cy={48} r={18} color="#84cc16" />
          <Circle cx={25} cy={yValue} r={10} color="#84cc16" />
        </Group>
      </Canvas>
    </Pressable>
  );
};

const BottomNavBar = () => {
  return (
    <SafeAreaView edges={["bottom"]}>
      <View className="h-16 w-full flex-row bg-lime-500">
        <BottomNavBarButton />
        <BottomNavBarButton />
        <BottomNavBarButton />
        <BottomNavBarButton />
      </View>
    </SafeAreaView>
  );
};

export default BottomNavBar;
