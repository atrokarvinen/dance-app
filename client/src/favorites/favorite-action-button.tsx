import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type Props = {
  dancePatternId: number;
  favoriteId?: number;
  addToFavorites: (dancePatternId: number) => void;
  removeFromFavorites: (dancePatternId: number) => void;
};

export const FavoriteActionButton = ({
  dancePatternId,
  favoriteId,
  addToFavorites,
  removeFromFavorites,
}: Props) => {
  const isFavorite = favoriteId !== undefined;
  const icon = isFavorite ? <Favorite /> : <FavoriteBorder />;
  const action = isFavorite ? removeFromFavorites : addToFavorites;
  const id = favoriteId ?? dancePatternId;
  return (
    <IconButton
      onClick={(e) => {
        action(id);
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      {icon}
    </IconButton>
  );
};
