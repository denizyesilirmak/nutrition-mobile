import { FOOD_SEARCH_API } from "@/src/constants/Api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export interface PageResponse {
  data: Food[];
  page: number;
}

export interface Food {
  carbonhydrate: number;
  protein: number;
  fat: number;
  energy: number;
  name: string;
  id: string;
  image: string;
}

export const useFoodSearch = ({
  searchTerm,
  initialPage = 1,
}: {
  searchTerm: string;
  initialPage?: number;
}) => {
  const { data, isError, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery<PageResponse>({
      queryKey: ["food", "search", searchTerm],
      staleTime: 1000 * 60 * 60, // 1 hour
      getNextPageParam: (lastPage) => {
        return lastPage?.data?.length === 20 ? lastPage.page + 1 : undefined;
      },
      initialPageParam: initialPage,
      queryFn: async ({ pageParam }) => {
        if (!searchTerm) {
          return {
            data: [],
            page: 1,
          };
        }

        const response = await fetch(
          `${FOOD_SEARCH_API}?query=${searchTerm.toLowerCase()}&page=${pageParam}&limit=20`,
        );

        const data = (await response.json()) as PageResponse;

        return {
          data: data.data,
          page: data.page,
        };
      },
    });

  const results = useMemo(() => {
    return data?.pages.flatMap((page) => page.data).filter(Boolean) ?? [];
  }, [data]);

  return {
    results,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  };
};
