import { Delete } from "@mui/icons-material";
import { Box, Button, IconButton, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { FavoritePattern } from "./models/list-view-favorite";

type Props = {
  favorite: FavoritePattern;
  onRemoveFavorite: (id: number) => void;
};

export const FavoriteListItem = ({ favorite, onRemoveFavorite }: Props) => {
  const { id, dancePattern } = favorite;
  const { dance } = dancePattern;
  return (
    <Box width="100%">
      <Stack direction="row">
        <Button
          variant="contained"
          to={`/dances/${dance.id}/dance-patterns/${dancePattern.id}`}
          state={{ returnUrl: "/favorites" }}
          component={Link}
          sx={{ flex: 1 }}
        >
          {dancePattern.name}
        </Button>
        <IconButton onClick={() => onRemoveFavorite(id)}>
          <Delete />
        </IconButton>
      </Stack>
    </Box>
  );
};
