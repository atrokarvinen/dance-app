import { List, ListItem } from "@mui/material";
import { selectIsAuthenticated } from "../../auth/auth-store";
import { useAppSelector } from "../../redux/store";
import { DancePattern, FavoritePattern } from "../dance";
import { DancePatternListItem } from "./dance-pattern-list-item";

type Props = {
  dancePatterns: DancePattern[];
  favorites: FavoritePattern[];
  isEditMode: boolean;
  onAddToFavorites: (dancePatternId: number) => void;
  onRemoveFromFavorites: (favoriteId: number) => void;
  onDeletePattern: (dancePattern: DancePattern) => void;
};

export const DancePatternListView = ({
  dancePatterns,
  favorites,
  isEditMode,
  onAddToFavorites,
  onRemoveFromFavorites,
  onDeletePattern,
}: Props) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const getFavoriteId = (pattern: DancePattern) => {
    const favorite = favorites.find(
      (favorite) => favorite.dancePatternId === pattern.id
    );
    return favorite?.id;
  };

  return (
    <List dense>
      {dancePatterns.map((pattern) => {
        const favoriteId = getFavoriteId(pattern);
        return (
          <ListItem key={pattern.id}>
            <DancePatternListItem
              pattern={pattern}
              favoriteId={favoriteId}
              isAuthenticated={isAuthenticated}
              isEditMode={isEditMode}
              onAddToFavorites={onAddToFavorites}
              onRemoveFromFavorites={onRemoveFromFavorites}
              onDeletePattern={onDeletePattern}
            />
          </ListItem>
        );
      })}
    </List>
  );
};
