import { Box, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { DancePattern } from "./dance";
import { FavoriteActionButton } from "./favorite-action-button";

type Props = {
  pattern: DancePattern;
  favoriteId: number | undefined;
  isAuthenticated: boolean;
  onAddToFavorites: (dancePatternId: number) => void;
  onRemoveFromFavorites: (favoriteId: number) => void;
  scrollY: number;
};

export const DancePatternListItem = ({
  pattern,
  favoriteId,
  isAuthenticated,
  onAddToFavorites,
  onRemoveFromFavorites,
  scrollY,
}: Props) => {
  const { id, name, danceId } = pattern;
  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row">
        <Button
          component={Link}
          to={`/dance-patterns/${id}`}
          variant="contained"
          state={{ returnUrl: `/dances/${danceId}`, scrollY }}
          sx={{ flex: 1 }}
        >
          {name}
        </Button>
        {isAuthenticated && (
          <FavoriteActionButton
            dancePatternId={id}
            favoriteId={favoriteId}
            addToFavorites={onAddToFavorites}
            removeFromFavorites={onRemoveFromFavorites}
          />
        )}
      </Stack>
    </Box>
  );
};
