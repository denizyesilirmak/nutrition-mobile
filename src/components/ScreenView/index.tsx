import { ScrollView, StyleProp, View, ViewStyle } from "react-native";

type ScreenViewProps = {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
};

const ScreenView = ({ children, scrollable, style }: ScreenViewProps) => {
  return (
    <ScrollView
      scrollEnabled={scrollable}
      style={[style]}
      contentContainerStyle={{
        paddingBottom: 20,
      }}
    >
      {children}
    </ScrollView>
  );
};

export default ScreenView;
