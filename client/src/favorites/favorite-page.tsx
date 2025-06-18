import { ErrorPage } from "../common/error-page";
import { Loader } from "../common/loaders";
import { useGetFavorites } from "./api/use-get-favorites";
import { FavoriteListView } from "./favorite-list-view";

export const FavoritePage = () => {
  const { error, favorites, loading } = useGetFavorites();

  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error.message} />;

  return <FavoriteListView favorites={favorites} />;
};
