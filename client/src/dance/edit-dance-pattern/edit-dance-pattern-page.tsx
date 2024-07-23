import { useParams } from "react-router";
import { ErrorPage } from "../../common/ErrorPage";
import { EditDancePatternView } from "./edit-dance-pattern-view";

type RouteParams = {
  danceId: string;
  dancePatternId: string;
};

export const EditDancePatternPage = () => {
  const { danceId: danceIdStr, dancePatternId: dancePatternIdStr } =
    useParams<RouteParams>();

  if (!danceIdStr)
    return <ErrorPage message={`Invalid dance ID '${danceIdStr}'`} />;
  if (!dancePatternIdStr)
    return <ErrorPage message={`Invalid dance ID '${danceIdStr}'`} />;

  const danceId = parseInt(danceIdStr);
  const dancePatternId = parseInt(dancePatternIdStr);

  return (
    <EditDancePatternView danceId={danceId} dancePatternId={dancePatternId} />
  );
};
