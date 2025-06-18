import { useQuery } from "@tanstack/react-query";
import { selectIsAuthenticated } from "../../auth/auth-store";
import { axios } from "../../common/axios";
import { useAppSelector } from "../../redux/store";
import { FavoritePattern } from "../dance";

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
