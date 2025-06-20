import ArrowBack from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FavoriteActionButton } from "../../favorites/favorite-action-button";
import type { DancePattern } from "../dance";
import { Video } from "./video";

type Props = {
  dancePattern: DancePattern;
  isAuthenticated: boolean;
  addToFavorites: (dancePatternId: number) => void;
  removeFromFavorites: (dancePatternId: number) => void;
  onNavigateBack: () => void;
};

export const DancePatternDetails = ({
  dancePattern,
  isAuthenticated,
  addToFavorites,
  removeFromFavorites,
  onNavigateBack,
}: Props) => {
  const { imageUrl, videoUrl, name, description, id } = dancePattern;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography component="h1" variant="h3">
        {name}
      </Typography>
      <Stack direction="row" justifyContent="space-between">
        <IconButton onClick={onNavigateBack}>
          <ArrowBack />
        </IconButton>
        {isAuthenticated && (
          <Box sx={{ alignSelf: "flex-end" }}>
            <FavoriteActionButton
              dancePatternId={id}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              favoriteId={id}
            />
          </Box>
        )}
      </Stack>
      <Typography paragraph>{description}</Typography>
      {imageUrl && <img src={imageUrl} alt={name} />}
      {videoUrl && <Video url={videoUrl} />}
    </Box>
  );
};
