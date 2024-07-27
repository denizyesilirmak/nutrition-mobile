import React, { useEffect, useState } from "react";
import { Keyboard, PanResponder, View, findNodeHandle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type KeyboardAwareScrollProps = {
  children: React.ReactNode;
};

const KeyboardAwareScroll = ({ children }: KeyboardAwareScrollProps) => {
  const keyboardHeight = useSharedValue(0);
  const lastTouchPosition = useSharedValue({ x: 0, y: 0 });
  const isKeyboardVisible = useDerivedValue(() => keyboardHeight.value > 0);

  const scrollViewAnimatedStyle = useAnimatedStyle(() => {
    return {
      marginTop: withTiming(
        isKeyboardVisible.value ? -lastTouchPosition.value.y / 2 : 0,
        {
          duration: 250,
        },
      ),
    };
  }, [keyboardHeight.value]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardWillShow",
      (event) => {
        keyboardHeight.value = event.endCoordinates.height;
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardWillHide",
      () => {
        keyboardHeight.value = 0;
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (event, gestureState) => true,
    onStartShouldSetPanResponderCapture: (event, gestureState) => true,
    onMoveShouldSetPanResponder: (event, gestureState) => false,
    onMoveShouldSetPanResponderCapture: (event, gestureState) => false,
    onPanResponderGrant: (event, gestureState) => false,
    onPanResponderMove: (event, gestureState) => false,
    onPanResponderRelease: (event, gestureState) => {
      //After the change in the location
      lastTouchPosition.value = {
        x: event.nativeEvent.pageX,
        y: event.nativeEvent.pageY,
      };
    },
  });

  return (
    <Animated.ScrollView
      className="flex-1"
      contentContainerClassName="flex-1"
      style={[scrollViewAnimatedStyle]}
    >
      <View {...panResponder.panHandlers} className="flex-1">
        {children}
      </View>
    </Animated.ScrollView>
  );
};

export default KeyboardAwareScroll;
