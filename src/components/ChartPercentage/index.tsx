import { View } from "react-native";

type ChartPercentageProps = {
  items?: {
    value: number;
    color: string;
  }[];
};

const ChartPercentage = ({ items = [] }: ChartPercentageProps) => {
  if (items.length === 0) {
    return null;
  }

  const total = items.reduce((acc, item) => acc + item.value, 0);

  return (
    <View
      className="w-full flex-row"
      style={{
        height: 2,
      }}
    >
      {items.map((item, index) => {
        const percentage = (item.value / total) * 100;

        return (
          <View
            key={index}
            className="h-1 bg-red-500"
            style={{ width: `${percentage}%`, backgroundColor: item.color }}
          />
        );
      })}
    </View>
  );
};

export default ChartPercentage;
