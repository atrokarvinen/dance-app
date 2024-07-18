import { Box, Typography } from "@mui/material";
import { Dance, FavoritePattern } from "./dance";
import { DancePatternList } from "./dance-pattern-list";

type Props = {
  dance: Dance;
  favorites: FavoritePattern[];
  onAddToFavorites: (dancePatternId: number) => void;
  onRemoveFromFavorites: (dancePatternId: number) => void;
};

export const DanceDetails = ({
  dance,
  favorites,
  onAddToFavorites,
  onRemoveFromFavorites,
}: Props) => {
  return (
    <Box>
      <Typography component="h1" variant="h3">
        {dance.name}
      </Typography>
      <DancePatternList
        dancePatterns={dance.dancePatterns}
        favorites={favorites}
        onAddToFavorites={onAddToFavorites}
        onRemoveFromFavorites={onRemoveFromFavorites}
      />
    </Box>
  );
};
