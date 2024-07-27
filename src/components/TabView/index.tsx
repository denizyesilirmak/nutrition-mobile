import React, { forwardRef, useRef } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";

type TabViewProps = {
  screens: any[];
  onIndexChange?: (index: number) => void;
  ref?: FlatList<any>;
};

const TabView = forwardRef<FlatList<any>, TabViewProps>(
  ({ screens, onIndexChange }: TabViewProps, ref) => {
    const { width } = useWindowDimensions();
    const lastIndexRef = useRef<number>(0);

    return (
      <FlatList
        ref={ref}
        onScroll={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          if (index !== lastIndexRef.current) {
            lastIndexRef.current = index;
            onIndexChange?.(index);
          }
        }}
        scrollEventThrottle={16}
        className="flex-1"
        pagingEnabled
        bounces={false}
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={screens}
        renderItem={({ item }) => <View style={{ width }}>{item.content}</View>}
        keyExtractor={(item) => item.id}
      />
    );
  },
);

TabView.displayName = "TabView";
export default TabView;
