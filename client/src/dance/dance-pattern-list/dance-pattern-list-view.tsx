import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { selectIsAuthenticated } from "../../auth/auth-store";
import { useAppSelector } from "../../redux/store";
import type {
  DancePattern,
  FavoritePattern,
} from "../dance-details/models/dance-details-type";
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
          <ListItem key={pattern.id} data-testid="dance-pattern-list-item">
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
