import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable, TextInput, View } from "react-native";

const SearchBar = () => {
  return (
    <View
      style={{
        width: "100%",
        height: 60,
        backgroundColor: "white",
        justifyContent: "center",
        padding: 8,
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
          borderRadius: 8,
          borderColor: "#cccccc",
          borderWidth: 1,
          flexDirection: "row",
        }}
      >
        <TextInput
          placeholder="Search for foods"
          placeholderTextColor={"#666666"}
          style={{
            flex: 1,
            paddingLeft: 12,
          }}
        />
        <Pressable
          onPress={() => {
            router.push("scanfood");
          }}
          style={{
            width: 44,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderLeftWidth: 1,
            borderLeftColor: "#cccccc",
          }}
        >
          <Ionicons name="scan-circle-outline" size={32} color="#666666" />
        </Pressable>
      </View>
    </View>
  );
};

export default SearchBar;
