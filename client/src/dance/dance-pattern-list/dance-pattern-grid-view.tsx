import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { DancePattern, FavoritePattern } from "../dance";
import { DancePatternCard } from "./dance-pattern-card";

type Props = {
  dancePatterns: DancePattern[];
  favorites: FavoritePattern[];
  isEditMode: boolean;
  onAddToFavorites: (dancePatternId: number) => void;
  onRemoveFromFavorites: (favoriteId: number) => void;
  onDeletePattern: (dancePattern: DancePattern) => void;
};

export const DancePatternGridView = ({
  dancePatterns,
  favorites,
  isEditMode,
  onAddToFavorites,
  onRemoveFromFavorites,
  onDeletePattern,
}: Props) => {
  return (
    <Grid container spacing={2}>
      {dancePatterns.map((pattern) => {
        const favorite = favorites.find(
          (favorite) => favorite.dancePatternId === pattern.id
        );
        const favoriteId = favorite?.id;
        const { danceId, id } = pattern;
        return (
          <Grid item key={id} xs={12} sm={6} md={4} lg={3}>
            <Link
              to={`/dances/${danceId}/dance-patterns/${id}`}
              state={{ returnUrl: `/dances/${danceId}` }}
              style={{ textDecoration: "none" }}
            >
              <DancePatternCard
                pattern={pattern}
                isEditMode={isEditMode}
                onDeletePattern={onDeletePattern}
                onAddToFavorites={onAddToFavorites}
                onRemoveFromFavorites={onRemoveFromFavorites}
                favoriteId={favoriteId}
              />
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};
