import { fetchFoodSearch, PageResponse } from "@/src/utils/services";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

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
      queryFn: ({ pageParam }) =>
        fetchFoodSearch({ searchTerm, page: pageParam }),
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
