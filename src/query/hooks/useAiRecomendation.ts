import { fetchAiRecommendation } from "@/src/utils/services";
import { useQuery } from "@tanstack/react-query";

type AiRecomendationType = {
  comments: string;
  "healthiness-point": number;
  suggestions: string;
};

const useAiRecomendation = ({ date }: { date: string }) => {
  const { data, isLoading, isError } = useQuery<AiRecomendationType, Error>({
    queryKey: ["aiRecomendation", { date }],
    queryFn: () => fetchAiRecommendation(date),
    staleTime: 1000 * 60 * 60 * 24,
  });

  return {
    recomendation: data as AiRecomendationType,
    isLoading,
    isError,
  };
};

export default useAiRecomendation;
