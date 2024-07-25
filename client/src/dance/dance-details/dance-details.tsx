import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import {
  onSetDancePatternEditMode,
  selectIsDancePatternEditMode,
} from "../../layout/ui-store";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Dance, DancePattern, FavoritePattern } from "../dance";
import { ActionButtons } from "../dance-list/action-buttons";
import {
  Page,
  usePreferredViewMode,
} from "../dance-list/use-preferred-view-mode";
import { DancePatternList } from "../dance-pattern-list/dance-pattern-list";

type Props = {
  dance: Dance;
  favorites: FavoritePattern[];
  onAddToFavorites: (dancePatternId: number) => void;
  onRemoveFromFavorites: (favoriteId: number) => void;
  onDeletePattern: (dancePattern: DancePattern) => void;
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
  const dispatch = useAppDispatch();
  const isEditMode = useAppSelector(selectIsDancePatternEditMode);
  const { viewMode, setViewMode } = usePreferredViewMode(Page.DANCE_PATTERN);
  return (
    <Box>
      <Typography component="h1" variant="h3">
        {dance.name}
      </Typography>
      <IconButton onClick={onNavigateBack} sx={{ alignSelf: "flex-start" }}>
        <ArrowBack />
      </IconButton>
      <ActionButtons
        viewMode={viewMode}
        isEditMode={isEditMode}
        addNewUrl={`/dances/${dance.id}/dance-patterns/new`}
        onEditModeChange={() =>
          dispatch(onSetDancePatternEditMode(!isEditMode))
        }
        onViewModeChange={setViewMode}
      />
      <DancePatternList
        dancePatterns={dance.dancePatterns}
        favorites={favorites}
        isEditMode={isEditMode}
        viewMode={viewMode}
        onAddToFavorites={onAddToFavorites}
        onRemoveFromFavorites={onRemoveFromFavorites}
        onDeletePattern={onDeletePattern}
      />
    </Box>
  );
};
