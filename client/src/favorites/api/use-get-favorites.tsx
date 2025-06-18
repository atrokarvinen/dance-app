import { useQuery } from "@tanstack/react-query";
import { selectIsAuthenticated } from "../../auth/auth-store";
import { axios } from "../../common/axios";
import { FavoritePattern } from "../../dance/dance";
import { useAppSelector } from "../../redux/store";

export const useGetFavorites = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { data, error, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => axios.get<FavoritePattern[]>("/favorites"),
    enabled: isAuthenticated,
  });

  return {
    favorites: data?.data ?? [],
    loading: isLoading,
    error: error,
  };
};
