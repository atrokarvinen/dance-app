import { useParams } from "react-router-dom";
import { DanceDetailsView } from "./dance-details-view";

type RouteParams = {
  danceId: string;
};

export const DanceDetailsPage = () => {
  const { danceId } = useParams<RouteParams>();
  if (!danceId) {
    return <div>Invalid dance ID '{danceId}'</div>;
  }
  const id = parseInt(danceId);

  return <DanceDetailsView danceId={id} />;
};
