import { useLocation, useParams } from "react-router-dom";
import { DanceDetailsView } from "./dance-details-view";

type RouteParams = {
  danceId: string;
};

export const DanceDetailsPage = () => {
  const { danceId } = useParams<RouteParams>();
  const location = useLocation();
  if (!danceId) {
    return <div>Invalid dance ID '{danceId}'</div>;
  }
  const id = parseInt(danceId);
  const initialScroll = location.state?.scrollY ?? 0;

  return <DanceDetailsView danceId={id} initialScroll={initialScroll} />;
};
