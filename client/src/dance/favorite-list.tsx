import { Link } from "react-router-dom";
import { useGetFavorites } from "./api/use-get-favorites";

export const FavoriteList = () => {
  const { error, favorites, loading } = useGetFavorites();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.map((favorite) => {
        const { favoritePatternId, dancePatternId, dancePattern, displayName } =
          favorite;
        return (
          <div key={favoritePatternId}>
            <Link to={`/dance-patterns/${dancePatternId}`}>
              {displayName ?? dancePattern.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
