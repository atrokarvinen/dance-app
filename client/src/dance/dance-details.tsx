import { useAddToFavorites } from "./api/use-add-to-favorites";
import { Dance } from "./dance";
import { DancePatternList } from "./dance-pattern-list";

type Props = {
  dance: Dance;
};

export const DanceDetails = ({ dance }: Props) => {
  const { addToFavorites } = useAddToFavorites();

  return (
    <div>
      <h1>{dance.name}</h1>
      <h2>List of patterns:</h2>
      <DancePatternList
        dancePatterns={dance.dancePatterns}
        onAddToFavorites={addToFavorites}
      />
    </div>
  );
};
