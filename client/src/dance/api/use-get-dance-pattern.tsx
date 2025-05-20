import { useQuery } from "@tanstack/react-query";
import { getDancePattern } from "./api";

type Props = { id: number };

export const useGetDancePattern = ({ id }: Props) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dancePattern", id],
    queryFn: () => getDancePattern(id),
  });

  return {
    dancePattern: data?.data,
    loading: isLoading,
    error,
  };
};
