import { ScrollView } from "react-native";

type ScreenViewProps = {
  children?: React.ReactNode;
  scrollable?: boolean;
  padding?: boolean;
};

const ScreenView = ({ children, scrollable, padding }: ScreenViewProps) => {
  return (
    <ScrollView
      bounces={false}
      scrollEnabled={scrollable}
      className="flex-1 bg-white dark:bg-black"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerClassName={`${scrollable ? "" : "flex-1"} ${padding ? "p-4" : ""}`}
    >
      {children && children}
    </ScrollView>
  );
};

export default ScreenView;
