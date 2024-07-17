import _ from "lodash";
import { ErrorPage } from "../common/ErrorPage";
import { Loader } from "../common/Loader";
import { useGetFavorites } from "./api/use-get-favorites";
import { FavoriteListItem } from "./favorite-list-item";

export const FavoriteList = () => {
  const { error, favorites, loading } = useGetFavorites();
  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error.message} />;

  const favoritesByDance = _.groupBy(
    favorites,
    (favorite) => favorite.dancePattern.dance.name
  );
  const danceNames = Object.keys(favoritesByDance);
  return (
    <div>
      <h1>Favorites</h1>
      <ul>
        {danceNames.map((danceName) => (
          <li key={danceName}>
            <h2>{danceName}</h2>
            <ul>
              {favoritesByDance[danceName].map((favorite) => {
                const { favoritePatternId } = favorite;
                return (
                  <FavoriteListItem
                    key={favoritePatternId}
                    favorite={favorite}
                  />
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
