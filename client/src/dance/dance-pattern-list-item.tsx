import { Box, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { DancePattern } from "./dance";
import { FavoriteActionButton } from "./favorite-action-button";

type Props = {
  pattern: DancePattern;
  isFavorite: boolean | undefined;
  onAddToFavorites: (dancePatternId: number) => void;
  onRemoveFromFavorites: (dancePatternId: number) => void;
};

export const DancePatternListItem = ({
  pattern,
  isFavorite,
  onAddToFavorites,
  onRemoveFromFavorites,
}: Props) => {
  const { dancePatternId, name, danceId } = pattern;
  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row">
        <Box flex={1}>
          <Button
            component={Link}
            to={`/dance-patterns/${dancePatternId}`}
            variant="contained"
            state={{ returnUrl: `/dances/${danceId}` }}
          >
            {name}
          </Button>
        </Box>
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
