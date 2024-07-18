import { Box, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { DancePattern } from "./dance";
import { FavoriteActionButton } from "./favorite-action-button";

type Props = {
  pattern: DancePattern;
  isFavorite: boolean | undefined;
  onAddToFavorites: (dancePatternId: number) => void;
  onRemoveFromFavorites: (dancePatternId: number) => void;
  scrollY: number;
};

export const DancePatternListItem = ({
  pattern,
  isFavorite,
  onAddToFavorites,
  onRemoveFromFavorites,
  scrollY,
}: Props) => {
  const { dancePatternId, name, danceId } = pattern;
  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row">
        <Button
          component={Link}
          to={`/dance-patterns/${dancePatternId}`}
          variant="contained"
          state={{ returnUrl: `/dances/${danceId}`, scrollY }}
          sx={{ flex: 1 }}
        >
          {name}
        </Button>
        {isFavorite !== undefined && (
          <FavoriteActionButton
            id={dancePatternId}
            isFavorite={isFavorite}
            addToFavorites={onAddToFavorites}
            removeFromFavorites={onRemoveFromFavorites}
          />
        )}
      </Stack>
    </Box>
  );
};
