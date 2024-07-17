import { Dance, FavoritePattern } from "./dance";
import { DancePatternList } from "./dance-pattern-list";

type Props = {
  dance: Dance;
  favorites: FavoritePattern[];
  onAddToFavorites: (dancePatternId: number) => void;
  onRemoveFromFavorites: (dancePatternId: number) => void;
};

export const DanceDetails = ({
  dance,
  favorites,
  onAddToFavorites,
  onRemoveFromFavorites,
}: Props) => {
  console.log("favorites:", favorites);

  return (
    <div>
      <h1>{dance.name}</h1>
      <h2>List of patterns:</h2>
      <DancePatternList
        dancePatterns={dance.dancePatterns}
        favorites={favorites}
        onAddToFavorites={onAddToFavorites}
        onRemoveFromFavorites={onRemoveFromFavorites}
      />
    </div>
  );
};
