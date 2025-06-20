import ExpandMore from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import groupBy from "lodash/groupBy";
import { type SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";
import {
  onCloseFavorite,
  onOpenFavorite,
  selectOpenFavorites,
} from "../layout/ui-store";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useRemoveFromFavorites } from "./api/use-remove-from-favorites";
import { FavoriteListItem } from "./favorite-list-item";
import type { FavoritePattern } from "./models/list-view-favorite";

type Props = {
  favorites: FavoritePattern[];
};

export const FavoriteListView = ({ favorites }: Props) => {
  const { t } = useTranslation();
  const { removeFromFavorites } = useRemoveFromFavorites();
  const dispatch = useAppDispatch();
  const openFavorites = useAppSelector(selectOpenFavorites);

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

  const favoritesByDance = groupBy(
    favorites,
    (favorite) => favorite.dancePattern.dance.name
  );
  const danceNames = Object.keys(favoritesByDance);
  if (danceNames.length === 0) {
    return (
      <Box>
        <Typography component="h1" variant="h3">
          {t("Favorites")}
        </Typography>
        <Typography>{t("No favorites have been added.")}</Typography>
      </Box>
    );
  }
  return (
    <Box>
      <Typography component="h1" variant="h3">
        {t("Favorites")}
      </Typography>
      <List>
        {danceNames.map((danceName) => (
          <ListItem key={danceName} data-testid="favorite-dance-list-item">
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
                      <ListItem
                        key={id}
                        data-testid="favorite-dance-pattern-list-item"
                      >
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
