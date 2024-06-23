import { View } from "react-native";
import Text from "../Text";
import Image from "../Image";
import ValueChip from "../ValueChip";

type Food = {
  id: string;
  name: string;
  description: string;
  image: string;
};

const FoodListItem = ({ food }: { food: Food }) => {
  return (
    <View
      style={{
        width: "100%",
        height: 128,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        padding: 10,
        backgroundColor: "#fff",
        gap: 6,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          height: 80,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: food.image }}
          style={{
            width: 80,
            height: 80,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 12,
          }}
        />
        <View
          style={{
            flex: 1,
            gap: 6,
          }}
        >
          <Text
            size="lg"
            style={{
              fontWeight: "bold",
            }}
          >
            {food.name}
          </Text>
          <Text
            style={{
              color: "#666",
              width: "100%",
            }}
          >
            {food.description}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 10,
          flexDirection: "row",
          gap: 10,
        }}
      >
        <ValueChip type="Energy" value={200} percent={50} />
        <ValueChip type="Protein" value={10} percent={50} />
        <ValueChip type="Fat" value={10} percent={50} />
        <ValueChip type="Carbs" value={10} percent={50} />
      </View>
    </View>
  );
};

export default FoodListItem;
