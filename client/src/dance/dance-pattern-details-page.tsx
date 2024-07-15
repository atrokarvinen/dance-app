import { useParams } from "react-router";
import { ErrorPage } from "../common/ErrorPage";
import { DancePatternDetailsView } from "./dance-pattern-details-view";

type RouteParams = {
  dancePatternId: string;
};

export const DancePatternDetailsPage = () => {
  const params = useParams<RouteParams>();
  if (!params.dancePatternId) {
    const message = "Dance pattern ID is required";
    return <ErrorPage message={message} />;
  }
  const id = parseInt(params.dancePatternId);
  return <DancePatternDetailsView id={id} />;
};
