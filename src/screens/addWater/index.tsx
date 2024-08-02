import { PanResponder, Text, View } from "react-native";
import LottieView from "lottie-react-native";

const AddWater = () => {
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      console.log("onPanResponderGrant");
    },
    onPanResponderMove: () => {
      console.log("onPanResponderMove");
    },
    onPanResponderRelease: () => {
      console.log("onPanResponderRelease");
    },
  });

  return (
    <View className="flex-1 p-4">
      <Text className="text-center text-2xl font-bold dark:text-white">
        Add Water
      </Text>
      <View className="p-0">
        <LottieView
          {...panResponder.panHandlers}
          source={require("../../assets/animations/water.json")}
          autoPlay
          loop
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default AddWater;
