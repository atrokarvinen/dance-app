import { Link } from "react-router-dom";
import { FavoritePattern } from "./dance";

type Props = {
  favorite: FavoritePattern;
};

export const FavoriteListItem = ({ favorite }: Props) => {
  const { dancePatternId, dancePattern, displayName } = favorite;
  return (
    <li>
      <Link to={`/dance-patterns/${dancePatternId}`}>
        {displayName ?? dancePattern.name}
      </Link>
    </li>
  );
};
