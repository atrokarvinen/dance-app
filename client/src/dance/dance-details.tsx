import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { Dance, FavoritePattern } from "./dance";
import { DancePatternList } from "./dance-pattern-list";

type Props = {
  dance: Dance;
  favorites: FavoritePattern[];
  onAddToFavorites: (dancePatternId: number) => void;
  onRemoveFromFavorites: (dancePatternId: number) => void;
  onNavigateBack: () => void;
};

export const DanceDetails = ({
  dance,
  favorites,
  onAddToFavorites,
  onRemoveFromFavorites,
  onNavigateBack,
}: Props) => {
  return (
    <Box>
      <Typography component="h1" variant="h3">
        {dance.name}
      </Typography>
      <IconButton onClick={onNavigateBack}>
        <ArrowBack />
      </IconButton>
      <DancePatternList
        dancePatterns={dance.dancePatterns}
        favorites={favorites}
        onAddToFavorites={onAddToFavorites}
        onRemoveFromFavorites={onRemoveFromFavorites}
      />
    </Box>
  );
};
