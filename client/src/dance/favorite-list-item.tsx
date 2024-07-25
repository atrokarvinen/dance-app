import { Delete } from "@mui/icons-material";
import { Box, Button, IconButton, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { FavoritePattern } from "./dance";

type Props = {
  favorite: FavoritePattern;
  onRemoveFavorite: (id: number) => void;
};

export const FavoriteListItem = ({ favorite, onRemoveFavorite }: Props) => {
  const { dancePatternId, dancePattern, displayName } = favorite;
  const { danceId } = dancePattern;
  return (
    <Box width="100%">
      <Stack direction="row">
        <Button
          variant="contained"
          to={`/dances/${danceId}/dance-patterns/${dancePatternId}`}
          state={{ returnUrl: "/favorites" }}
          component={Link}
          sx={{ flex: 1 }}
        >
          {displayName ?? dancePattern.name}
        </Button>
        <IconButton onClick={() => onRemoveFavorite(dancePatternId)}>
          <Delete />
        </IconButton>
      </Stack>
    </Box>
  );
};
