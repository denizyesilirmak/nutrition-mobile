import FoodListItem from "@/src/components/FoodListItem";
import ScreenView from "@/src/components/ScreenView";
import SearchBar from "@/src/components/SearchBar";
import useDebounce from "@/src/hooks/useDebounce";
import { useFoodSearch } from "@/src/query/hooks/useFoodSearch";
import { useScrollToTop } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { Text, View } from "react-native";

const FoodsScreen = () => {
  const flashListRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { results, isLoading, fetchNextPage, hasNextPage, isError } =
    useFoodSearch({ searchTerm: debouncedSearchTerm });

  useScrollToTop(flashListRef);

  return (
    <ScreenView>
      <StatusBar style="dark" animated />
      <SearchBar onChangeText={setSearchTerm} />
      <FlashList
        ref={flashListRef}
        data={results}
        keyExtractor={(food) => food.id}
        renderItem={({ item }) => <FoodListItem food={item} />}
        estimatedItemSize={122}
        onEndReachedThreshold={1.8}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        ListEmptyComponent={() => {
          return (
            <View className="flex-1 items-center justify-center">
              <Text className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                {isError
                  ? "An error occurred while fetching data."
                  : isLoading
                    ? "Loading..."
                    : "No results found."}
              </Text>
            </View>
          );
        }}
      />
    </ScreenView>
  );
};

export default FoodsScreen;
