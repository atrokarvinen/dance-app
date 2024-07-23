import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, IconButton, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { DancePattern } from "./dance";
import { FavoriteActionButton } from "./favorite-action-button";

type Props = {
  pattern: DancePattern;
  favoriteId: number | undefined;
  isAuthenticated: boolean;
  onAddToFavorites: (dancePatternId: number) => void;
  onRemoveFromFavorites: (favoriteId: number) => void;
  onDeletePattern: (id: number) => void;
};

export const DancePatternListItem = ({
  pattern,
  favoriteId,
  isAuthenticated,
  onAddToFavorites,
  onRemoveFromFavorites,
  onDeletePattern,
}: Props) => {
  const { id, name, danceId } = pattern;
  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row">
        <Button
          component={Link}
          to={`/dance-patterns/${id}`}
          variant="contained"
          state={{ returnUrl: `/dances/${danceId}` }}
          sx={{ flex: 1 }}
        >
          {name}
        </Button>
        {isAuthenticated && (
          <Stack direction="row">
            <FavoriteActionButton
              dancePatternId={id}
              favoriteId={favoriteId}
              addToFavorites={onAddToFavorites}
              removeFromFavorites={onRemoveFromFavorites}
            />
            <IconButton
              component={Link}
              to={`/dances/${danceId}/dance-patterns/${id}/edit`}
            >
              <Edit />
            </IconButton>
            <IconButton onClick={() => onDeletePattern(id)}>
              <Delete />
            </IconButton>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};
