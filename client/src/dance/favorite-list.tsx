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
import { SyntheticEvent } from "react";
import { ErrorPage } from "../common/error-page";
import { Loader } from "../common/loaders";
import {
  onCloseFavorite,
  onOpenFavorite,
  selectOpenFavorites,
} from "../layout/ui-store";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useGetFavorites } from "./api/use-get-favorites";
import { useRemoveFromFavorites } from "./api/use-remove-from-favorites";
import { FavoriteListItem } from "./favorite-list-item";

export const FavoriteList = () => {
  const { error, favorites, loading } = useGetFavorites();
  const { removeFromFavorites } = useRemoveFromFavorites();
  const dispatch = useAppDispatch();
  const openFavorites = useAppSelector(selectOpenFavorites);

  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error.message} />;

  const handleRemoveFromFavorites = async (id: number) => {
    await removeFromFavorites(id);
  };

  const handleAccordionExpandedChange =
    (id: string) => (_: SyntheticEvent, expanded: boolean) => {
      if (expanded) {
        dispatch(onOpenFavorite(id));
      } else {
        dispatch(onCloseFavorite(id));
      }
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
            <Accordion
              sx={{ width: "100%" }}
              onChange={handleAccordionExpandedChange(danceName)}
              expanded={openFavorites.includes(danceName)}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                {danceName}
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {favoritesByDance[danceName].map((favorite) => {
                    const { id } = favorite;
                    return (
                      <ListItem key={id}>
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
