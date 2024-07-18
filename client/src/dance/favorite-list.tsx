import { Box, List, ListItem, Typography } from "@mui/material";
import _ from "lodash";
import { ErrorPage } from "../common/ErrorPage";
import { Loader } from "../common/Loader";
import { useGetFavorites } from "./api/use-get-favorites";
import { FavoriteListItem } from "./favorite-list-item";

export const FavoriteList = () => {
  const { error, favorites, loading } = useGetFavorites();
  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error.message} />;

  const favoritesByDance = _.groupBy(
    favorites,
    (favorite) => favorite.dancePattern.dance.name
  );
  const danceNames = Object.keys(favoritesByDance);
  if (danceNames.length === 0) {
    return <Box>No favorites found</Box>;
  }
  return (
    <Box>
      <Typography component="h1" variant="h3">
        Favorites
      </Typography>
      <List>
        {danceNames.map((danceName) => (
          <ListItem key={danceName}>
            <Typography component="h2" variant="h4">
              {danceName}
            </Typography>
            <List>
              {favoritesByDance[danceName].map((favorite) => {
                const { favoritePatternId } = favorite;
                return (
                  <ListItem key={favoritePatternId}>
                    <FavoriteListItem favorite={favorite} />
                  </ListItem>
                );
              })}
            </List>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
