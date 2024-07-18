import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type Props = {
  id: number;
  isFavorite: boolean;
  addToFavorites: (dancePatternId: number) => void;
  removeFromFavorites: (dancePatternId: number) => void;
};

export const FavoriteActionButton = ({
  id,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
}: Props) => {
  const icon = isFavorite ? <Favorite /> : <FavoriteBorder />;
  const action = isFavorite ? removeFromFavorites : addToFavorites;
  return <IconButton onClick={() => action(id)}>{icon}</IconButton>;
};
