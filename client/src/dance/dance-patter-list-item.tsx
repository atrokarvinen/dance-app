import { Link } from "react-router-dom";
import { DancePattern } from "./dance";
import { FavoriteActionButton } from "./favorite-action-button";

type Props = {
  pattern: DancePattern;
  isFavorite: boolean | undefined;
  onAddToFavorites: (dancePatternId: number) => void;
  onRemoveFromFavorites: (dancePatternId: number) => void;
};

export const DancePatternListItem = ({
  pattern,
  isFavorite,
  onAddToFavorites,
  onRemoveFromFavorites,
}: Props) => {
  const { dancePatternId, name } = pattern;
  return (
    <li>
      <Link to={`/dance-patterns/${dancePatternId}`}>{name}</Link>
      {isFavorite !== undefined && (
        <FavoriteActionButton
          id={dancePatternId}
          isFavorite={isFavorite}
          addToFavorites={onAddToFavorites}
          removeFromFavorites={onRemoveFromFavorites}
        />
      )}
    </li>
  );
};
