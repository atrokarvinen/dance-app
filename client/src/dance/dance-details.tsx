import { ArrowBack } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Dance, FavoritePattern } from "./dance";
import { DancePatternList } from "./dance-pattern-list";

type Props = {
  dance: Dance;
  favorites: FavoritePattern[];
  onAddToFavorites: (dancePatternId: number) => void;
  onRemoveFromFavorites: (favoriteId: number) => void;
  onDeletePattern: (id: number) => void;
  onNavigateBack: () => void;
};

export const DanceDetails = ({
  dance,
  favorites,
  onAddToFavorites,
  onRemoveFromFavorites,
  onDeletePattern,
  onNavigateBack,
}: Props) => {
  return (
    <Box>
      <Typography component="h1" variant="h3">
        {dance.name}
      </Typography>
      <IconButton onClick={onNavigateBack} sx={{ alignSelf: "flex-start" }}>
        <ArrowBack />
      </IconButton>
      <Button component={Link} to={`/dances/${dance.id}/dance-patterns/new`}>
        + Add new
      </Button>
      <DancePatternList
        dancePatterns={dance.dancePatterns}
        favorites={favorites}
        onAddToFavorites={onAddToFavorites}
        onRemoveFromFavorites={onRemoveFromFavorites}
        onDeletePattern={onDeletePattern}
      />
    </Box>
  );
};
