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
  const text = isFavorite ? "Remove from favorites" : "Add to favorites";
  const action = isFavorite ? removeFromFavorites : addToFavorites;
  return <button onClick={() => action(id)}>{text}</button>;
};
