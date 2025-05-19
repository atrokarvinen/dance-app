import { useQuery } from "@tanstack/react-query";
import { getDance } from "./api";

export const useGetDance = (danceId: number) => {
  const queryResult = useQuery({
    queryKey: ["dance", danceId],
    queryFn: () => getDance(danceId),
  });

  return {
    error: queryResult.error,
    loading: queryResult.isLoading,
    dance: queryResult.data?.data,
    refetch: queryResult.refetch,
  };
};
