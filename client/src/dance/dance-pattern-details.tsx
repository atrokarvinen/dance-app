import { DancePattern } from "./dance";
import { FavoriteActionButton } from "./favorite-action-button";

type Props = {
  dancePattern: DancePattern;
  addToFavorites: (dancePatternId: number) => void;
  removeFromFavorites: (dancePatternId: number) => void;
};

export const DancePatternDetails = ({
  dancePattern,
  addToFavorites,
  removeFromFavorites,
}: Props) => {
  const { isFavorite } = dancePattern;
  console.log("isFavorite:", isFavorite);

  return (
    <div>
      <h1>Details</h1>
      <div>
        <h2>{dancePattern.name}</h2>
        <p>{dancePattern.description}</p>
        <img src={dancePattern.imageUrl} alt={dancePattern.name} />
        <a href={dancePattern.videoUrl}>Video</a>

        {isFavorite !== undefined && (
          <FavoriteActionButton
            id={dancePattern.dancePatternId}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            isFavorite={isFavorite}
          />
        )}
      </div>
    </div>
  );
};
