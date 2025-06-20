import { useParams } from "react-router-dom";
import { ErrorPage } from "../../common/error-page";
import { EditDancePatternView } from "./edit-dance-pattern-view";

type RouteParams = {
  danceId: string;
  dancePatternId: string;
};

export const EditDancePatternPage = () => {
  const { danceId: danceIdStr, dancePatternId: dancePatternIdStr } =
    useParams<RouteParams>();

  const danceId = Number(danceIdStr);
  const dancePatternId = Number(dancePatternIdStr);

  if (!danceIdStr || isNaN(danceId) || danceId <= 0)
    return <ErrorPage message={`Invalid dance ID '${danceIdStr}'`} />;
  if (!dancePatternIdStr || isNaN(dancePatternId) || dancePatternId <= 0)
    return (
      <ErrorPage message={`Invalid dance pattern ID '${dancePatternIdStr}'`} />
    );

  return (
    <EditDancePatternView danceId={danceId} dancePatternId={dancePatternId} />
  );
};
