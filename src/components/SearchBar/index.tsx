import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable, TextInput, View } from "react-native";

type SearchBarProps = {
  onChangeText: (text: string) => void;
};

const SearchBar = ({ onChangeText }: SearchBarProps) => {
  return (
    <View className="h-20 w-full flex-row items-center justify-center bg-white p-2 dark:bg-black">
      <View className="flex-row items-center justify-center rounded-2xl border border-gray-600 bg-white p-1 dark:bg-black">
        <TextInput
          placeholder="Search for foods"
          placeholderTextColor={"#666666"}
          onChangeText={onChangeText}
          className="flex-1 pl-3 dark:text-white"
        />
        <Pressable
          onPress={() => {
            router.push("camera");
          }}
          className="rounded-r-lg bg-white p-2 dark:bg-black"
        >
          <Ionicons name="scan-circle-outline" size={30} color="#666666" />
        </Pressable>
      </View>
    </View>
  );
};

export default SearchBar;
