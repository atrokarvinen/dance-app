import { Delete, Edit } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DancePattern } from "../dance";
import { getYoutubeThumbnail } from "../dance-pattern-details/youtube-video-utils";
import { FavoriteActionButton } from "../favorite-action-button";

type Props = {
  isEditMode: boolean;
  pattern: DancePattern;
  onDeletePattern: (pattern: DancePattern) => void;
  onAddToFavorites: (dancePatternId: number) => void;
  onRemoveFromFavorites: (favoriteId: number) => void;
  favoriteId?: number;
};

export const DancePatternCard = ({
  isEditMode,
  pattern,
  onDeletePattern,
  onAddToFavorites,
  onRemoveFromFavorites,
  favoriteId,
}: Props) => {
  const { id, danceId, name, videoUrl } = pattern;
  const thumbnail = getYoutubeThumbnail(videoUrl);
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader
        title={
          <Stack direction="row" justifyContent="space-between">
            {name}
            <FavoriteActionButton
              dancePatternId={id}
              favoriteId={favoriteId}
              addToFavorites={onAddToFavorites}
              removeFromFavorites={onRemoveFromFavorites}
            />
          </Stack>
        }
      />
      <Divider />
      <CardContent>
        <CardMedia
          image={thumbnail}
          sx={{ height: 200, backgroundSize: "contain" }}
        />
      </CardContent>
      {isEditMode && (
        <>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/dances/${danceId}/dance-patterns/${id}/edit`);
              }}
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDeletePattern(pattern);
              }}
            >
              <Delete />
            </IconButton>
          </CardActions>
        </>
      )}
    </Card>
  );
};
