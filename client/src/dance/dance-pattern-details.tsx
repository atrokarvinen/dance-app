import { useParams } from "react-router";
import { dummyPatterns } from "./dummy-data/dance-patterns";

type RouteParams = {
  dancePatternId: string;
};

export const DancePatternDetails = () => {
  const params = useParams<RouteParams>();
  if (!params.dancePatternId) {
    return <div>Invalid dance pattern ID '{params.dancePatternId}'</div>;
  }
  const id = parseInt(params.dancePatternId);
  const dancePattern = dummyPatterns.find((x) => x.dancePatternId == id);
  if (!dancePattern) {
    return <div>Dance pattern not found</div>;
  }

  return (
    <div>
      <h1>Details</h1>
      <div>
        <h2>{dancePattern.name}</h2>
        <p>{dancePattern.description}</p>
        <img src={dancePattern.imageUrl} alt={dancePattern.name} />
        <a href={dancePattern.videoUrl}>Video</a>
        <button>Add to favorites</button>
      </div>
    </div>
  );
};
