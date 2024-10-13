import { ScrollView } from "react-native";

type ScreenViewProps = {
  children?: React.ReactNode;
  scrollable?: boolean;
  padding?: boolean;
  bounces?: boolean;
};

const ScreenView = ({
  children,
  scrollable,
  padding,
  bounces = false,
}: ScreenViewProps) => {
  return (
    <ScrollView
      bounces={bounces}
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
