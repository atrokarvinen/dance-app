import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { ErrorPage } from "../common/ErrorPage";
import { Loader } from "../common/Loader";
import { useGetFavorites } from "./api/use-get-favorites";
import { useRemoveFromFavorites } from "./api/use-remove-from-favorites";
import { FavoriteListItem } from "./favorite-list-item";

export const FavoriteList = () => {
  const { error, favorites, loading, refetch } = useGetFavorites();
  const { removeFromFavorites } = useRemoveFromFavorites();
  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error.message} />;

  const handleRemoveFromFavorites = async (id: number) => {
    await removeFromFavorites(id);
    await refetch();
  };

  const favoritesByDance = _.groupBy(
    favorites,
    (favorite) => favorite.dancePattern.dance.name
  );
  const danceNames = Object.keys(favoritesByDance);
  if (danceNames.length === 0) {
    return (
      <Box>
        <Typography component="h1" variant="h3">
          Favorites
        </Typography>
        <Typography paragraph>No favorites have been added.</Typography>
      </Box>
    );
  }
  return (
    <Box>
      <Typography component="h1" variant="h3">
        Favorites
      </Typography>
      <List>
        {danceNames.map((danceName) => (
          <ListItem key={danceName}>
            <Accordion sx={{ width: "100%" }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                {danceName}
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {favoritesByDance[danceName].map((favorite) => {
                    const { favoritePatternId } = favorite;
                    return (
                      <ListItem key={favoritePatternId}>
                        <FavoriteListItem
                          favorite={favorite}
                          onRemoveFavorite={handleRemoveFromFavorites}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </AccordionDetails>
            </Accordion>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
