import useAiRecomendation from "@/src/query/hooks/useAiRecomendation";
import { Text, View } from "react-native";

const Stars = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 10 }).map((_, index) => {
    if (index < rating) {
      return "★";
    }

    return "☆";
  });

  return (
    <View className="flex flex-row justify-between px-4">
      {stars.map((star, index) => (
        <Text
          key={index}
          className="text-3xl text-lime-500 dark:text-green-400"
        >
          {star}
        </Text>
      ))}
    </View>
  );
};

const AiRecommendationView = ({ date }: { date: string }) => {
  const { recomendation, isLoading, isError } = useAiRecomendation({
    date: date,
  });

  return (
    <View className="flex-1 gap-2">
      <View className="gap-2 rounded-lg bg-gray-100 p-2 pb-4 dark:bg-gray-800">
        <Text className="text-xl font-bold text-black dark:text-white">
          🌿 Health Score: {recomendation?.["healthiness-point"]} / 10
        </Text>
        <Stars rating={recomendation?.["healthiness-point"] || 0} />
      </View>

      <View className="gap-2 rounded-lg bg-lime-400 p-2 pb-4 dark:bg-green-400">
        <Text className="text-xl font-bold text-black">🎗️ Comments</Text>
        <Text className="text-m px-2 text-black">
          {recomendation?.comments}
        </Text>
      </View>

      <View className="gap-2 rounded-lg bg-gray-100 p-2 pb-4 dark:bg-gray-800">
        <Text className="text-xl font-bold text-black dark:text-white">
          💡 Suggestions
        </Text>
        <Text className="text-m px-2 text-black dark:text-white">
          {recomendation?.suggestions}
        </Text>
      </View>
    </View>
  );
};

export default AiRecommendationView;
