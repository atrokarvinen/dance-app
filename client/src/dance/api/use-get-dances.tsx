import { useQuery } from "@tanstack/react-query";
import { getDances } from "./api";

export const useGetDances = () => {
  const queryResult = useQuery({
    queryKey: ["dances"],
    queryFn: () => getDances(),
  });

  return {
    error: queryResult.error,
    loading: queryResult.isLoading,
    dances: queryResult.data?.data ?? [],
    refetch: queryResult.refetch,
  };
};
