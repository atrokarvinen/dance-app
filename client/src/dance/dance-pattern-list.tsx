import { Box, List, ListItem } from "@mui/material";
import { selectIsAuthenticated } from "../auth/auth-store";
import { useAppSelector } from "../redux/store";
import { DancePattern, FavoritePattern } from "./dance";
import { DancePatternListItem } from "./dance-pattern-list-item";

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

  if (dancePatterns.length === 0) {
    return <Box>No dance patterns found</Box>;
  }
  return (
    <Box>
      <List>
        {dancePatterns.map((pattern) => {
          const isFavorite = isAuthenticated
            ? isPatternInFavorites(pattern)
            : undefined;
          return (
            <ListItem key={pattern.dancePatternId}>
              <DancePatternListItem
                pattern={pattern}
                isFavorite={isFavorite}
                onAddToFavorites={onAddToFavorites}
                onRemoveFromFavorites={onRemoveFromFavorites}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
