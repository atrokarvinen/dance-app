import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { FavoritePattern } from "./dance";

type Props = {
  favorite: FavoritePattern;
};

export const FavoriteListItem = ({ favorite }: Props) => {
  const { dancePatternId, dancePattern, displayName } = favorite;
  return (
    <Box>
      <Link
        to={`/dance-patterns/${dancePatternId}`}
        state={{ returnUrl: "/favorites" }}
      >
        {displayName ?? dancePattern.name}
      </Link>
    </Box>
  );
};
