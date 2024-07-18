import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { DancePattern } from "../dance";
import { FavoriteActionButton } from "../favorite-action-button";
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
  const { isFavorite, imageUrl, videoUrl, name, description, dancePatternId } =
    dancePattern;

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
              id={dancePatternId}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              isFavorite={isFavorite!}
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
