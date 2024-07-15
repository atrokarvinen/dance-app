import { Link } from "react-router-dom";
import { DancePattern } from "./dance";

type Props = {
  dancePatterns: DancePattern[];
  onAddToFavorites: (dancePatternId: number) => void;
};

export const DancePatternList = ({
  dancePatterns,
  onAddToFavorites,
}: Props) => {
  return (
    <div>
      <h2>Dance Patterns</h2>
      <ul>
        {dancePatterns.map((pattern) => (
          <li key={pattern.dancePatternId}>
            <Link to={`/dance-patterns/${pattern.dancePatternId}`}>
              {pattern.name}
            </Link>
            <button onClick={() => onAddToFavorites(pattern.dancePatternId)}>
              Add to favorites
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
