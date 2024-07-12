import { Link } from "react-router-dom";
import { FavoritePattern } from "./dance";
import { dummyPatterns } from "./dummy-data/dance-patterns";
import { dummyDances } from "./dummy-data/dances";
import { dummyFavorites } from "./dummy-data/favorites";

export const FavoriteList = () => {
  const favorites: FavoritePattern[] = dummyFavorites;

  const favoriteDanceIds = favorites
    .map((favorite) => {
      const pattern = dummyPatterns.find(
        (x) => x.dancePatternId == favorite.dancePatternId
      );
      return pattern?.danceId;
    })
    .filter((x) => x)
    .map((x) => x!);

  const uniqueIds = [...new Set(favoriteDanceIds)];
  const favoriteDances = uniqueIds
    .map((id) => {
      const pattern = dummyDances.find((x) => x.danceId == id);
      return pattern;
    })
    .filter((x) => x)
    .map((x) => x!);

  return (
    <div>
      <h1>Favorites</h1>
      {favoriteDances.map((dance) => {
        const favsInDance = favorites.filter(
          (x) =>
            dummyPatterns.find((y) => y.dancePatternId == x.dancePatternId)
              ?.danceId == dance.danceId
        );
        return (
          <div key={dance.danceId}>
            <h2>{dance.name}</h2>
            {favsInDance.map((favorite) => {
              const pattern = dummyPatterns.find(
                (x) => x.dancePatternId == favorite.dancePatternId
              );
              return (
                <div key={favorite.favoritePatternId}>
                  <Link to={`/dance-patterns/${favorite.dancePatternId}`}>
                    {favorite.displayName ?? pattern?.name ?? "Unknown"}
                  </Link>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
