import { useParams } from "react-router";
import { ErrorPage } from "../../common/ErrorPage";
import { EditDanceView } from "./edit-dance-view";

type RouteParams = {
  danceId: string;
};

export const EditDancePage = () => {
  const { danceId: danceIdStr } = useParams<RouteParams>();

  if (!danceIdStr)
    return <ErrorPage message={`Invalid dance ID '${danceIdStr}'`}></ErrorPage>;

  const danceId = parseInt(danceIdStr);

  return <EditDanceView danceId={danceId} />;
};
