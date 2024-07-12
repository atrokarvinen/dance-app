import { useParams } from "react-router-dom";
import { DancePatternList } from "./dance-pattern-list";
import { dummyDances } from "./dummy-data/dances";

type RouteParams = {
  danceId: string;
};

export const DanceDetails = () => {
  const { danceId } = useParams<RouteParams>();
  if (!danceId) {
    return <div>Invalid dance ID '{danceId}'</div>;
  }
  const id = parseInt(danceId);
  const dance = dummyDances.find((x) => x.danceId == id);
  if (!dance) {
    return <div>Dance not found</div>;
  }

  return (
    <div>
      <h1>{dance.name}</h1>
      <h2>List of patterns:</h2>
      <DancePatternList dancePatterns={dance.dancePatterns} />
    </div>
  );
};
