import { DancePattern } from "../dance";
import { FavoriteActionButton } from "../favorite-action-button";
import { Video } from "./video";

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
  const { isFavorite, imageUrl, videoUrl, name, description, dancePatternId } =
    dancePattern;

  console.log("video:", dancePattern.videoUrl);
  console.log("image:", dancePattern.imageUrl);

  return (
    <div>
      <h1>Details</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <h2>{name}</h2>
        <p>{description}</p>
        {imageUrl && <img src={imageUrl} alt={name} />}
        {videoUrl && <Video url={videoUrl} />}
        {isFavorite !== undefined && (
          <FavoriteActionButton
            id={dancePatternId}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            isFavorite={isFavorite}
          />
        )}
      </div>
    </div>
  );
};
