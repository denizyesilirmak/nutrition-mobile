import { Text, View, ScrollView } from "react-native";

type TableProps = {
  items: {
    name: string;
    value: number;
    unit?: string;
  }[];
};

const Table = ({ items = [] }: TableProps) => {
  return (
    <View className="flex flex-col overflow-hidden rounded-lg">
      <View className="flex-row items-center justify-between border-b border-gray-300 bg-gray-200 p-4 dark:border-gray-800 dark:bg-gray-600">
        <Text className="text-md font-bold text-gray-500 dark:text-gray-400">
          Nutrition
        </Text>
        <Text className="text-md font-bold text-gray-500 dark:text-gray-400">
          Amount
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ maxHeight: 400 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 140 }}
        bounces={false}
      >
        {items.map((item) => (
          <View
            key={item.name}
            className="flex-row items-center justify-between bg-gray-100 p-4 dark:bg-gray-800"
          >
            <Text className="text-md font-semibold text-gray-500 dark:text-gray-400">
              {item.name}
            </Text>
            <Text className="text-md text-gray-500 dark:text-gray-400">
              {item.value} {item.unit || "mg"}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Table;
