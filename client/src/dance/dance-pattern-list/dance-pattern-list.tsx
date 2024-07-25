import { Typography } from "@mui/material";
import { DancePattern, FavoritePattern } from "../dance";
import { DancePatternGridView } from "./dance-pattern-grid-view";
import { DancePatternListView } from "./dance-pattern-list-view";

type Props = {
  dancePatterns: DancePattern[];
  favorites: FavoritePattern[];
  isEditMode: boolean;
  viewMode: string;
  onAddToFavorites: (dancePatternId: number) => void;
  onRemoveFromFavorites: (favoriteId: number) => void;
  onDeletePattern: (dancePattern: DancePattern) => void;
};

export const DancePatternList = ({
  dancePatterns,
  favorites,
  isEditMode,
  viewMode,
  onAddToFavorites,
  onRemoveFromFavorites,
  onDeletePattern,
}: Props) => {
  const isListView = viewMode === "list";
  if (dancePatterns.length === 0) {
    return (
      <Typography paragraph>No dance patterns have been added.</Typography>
    );
  }
  if (isListView)
    return (
      <DancePatternListView
        dancePatterns={dancePatterns}
        favorites={favorites}
        isEditMode={isEditMode}
        onAddToFavorites={onAddToFavorites}
        onRemoveFromFavorites={onRemoveFromFavorites}
        onDeletePattern={onDeletePattern}
      />
    );
  return (
    <DancePatternGridView
      dancePatterns={dancePatterns}
      favorites={favorites}
      isEditMode={isEditMode}
      onAddToFavorites={onAddToFavorites}
      onRemoveFromFavorites={onRemoveFromFavorites}
      onDeletePattern={onDeletePattern}
    />
  );
};
