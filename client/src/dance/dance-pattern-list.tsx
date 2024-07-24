import { Box, List, ListItem, Typography } from "@mui/material";
import { selectIsAuthenticated } from "../auth/auth-store";
import { useAppSelector } from "../redux/store";
import { DancePattern, FavoritePattern } from "./dance";
import { DancePatternListItem } from "./dance-pattern-list-item";

type Props = {
  dancePatterns: DancePattern[];
  favorites: FavoritePattern[];
  onAddToFavorites: (dancePatternId: number) => void;
  onRemoveFromFavorites: (favoriteId: number) => void;
  onDeletePattern: (id: number) => void;
};

export const DancePatternList = ({
  dancePatterns,
  favorites,
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

  if (dancePatterns.length === 0) {
    return (
      <Typography paragraph>No dance patterns have been added.</Typography>
    );
  }
  return (
    <Box>
      <List>
        {dancePatterns.map((pattern) => {
          const favoriteId = getFavoriteId(pattern);
          return (
            <ListItem key={pattern.id}>
              <DancePatternListItem
                pattern={pattern}
                favoriteId={favoriteId}
                isAuthenticated={isAuthenticated}
                onAddToFavorites={onAddToFavorites}
                onRemoveFromFavorites={onRemoveFromFavorites}
                onDeletePattern={onDeletePattern}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
