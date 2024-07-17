import { selectIsAuthenticated } from "../auth/auth-store";
import { useAppSelector } from "../redux/store";
import { DancePattern, FavoritePattern } from "./dance";
import { DancePatternListItem } from "./dance-patter-list-item";

type Props = {
  dancePatterns: DancePattern[];
  favorites: FavoritePattern[];
  onAddToFavorites: (dancePatternId: number) => void;
  onRemoveFromFavorites: (dancePatternId: number) => void;
};

export const DancePatternList = ({
  dancePatterns,
  favorites,
  onAddToFavorites,
  onRemoveFromFavorites,
}: Props) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const isPatternInFavorites = (pattern: DancePattern) => {
    return favorites.some(
      (favorite) => favorite.dancePatternId === pattern.dancePatternId
    );
  };

  return (
    <div>
      <h2>Dance Patterns</h2>
      <ul>
        {dancePatterns.map((pattern) => {
          const isFavorite = isAuthenticated
            ? isPatternInFavorites(pattern)
            : undefined;
          return (
            <DancePatternListItem
              key={pattern.dancePatternId}
              pattern={pattern}
              isFavorite={isFavorite}
              onAddToFavorites={onAddToFavorites}
              onRemoveFromFavorites={onRemoveFromFavorites}
            />
          );
        })}
      </ul>
    </div>
  );
};
