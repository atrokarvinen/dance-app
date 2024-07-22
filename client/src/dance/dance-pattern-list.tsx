import { Box, List, ListItem } from "@mui/material";
import { selectIsAuthenticated } from "../auth/auth-store";
import { useAppSelector } from "../redux/store";
import { DancePattern, FavoritePattern } from "./dance";
import { DancePatternListItem } from "./dance-pattern-list-item";

type Props = {
  dancePatterns: DancePattern[];
  favorites: FavoritePattern[];
  onAddToFavorites: (dancePatternId: number) => void;
  onRemoveFromFavorites: (favoriteId: number) => void;
  scrollY: number;
};

export const DancePatternList = ({
  dancePatterns,
  favorites,
  onAddToFavorites,
  onRemoveFromFavorites,
  scrollY,
}: Props) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  console.log("favorites count:", favorites.length);

  const getFavoriteId = (pattern: DancePattern) => {
    const favorite = favorites.find(
      (favorite) => favorite.dancePatternId === pattern.id
    );
    return favorite?.id;
  };

  if (dancePatterns.length === 0) {
    return <Box>No dance patterns found</Box>;
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
                scrollY={scrollY}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
