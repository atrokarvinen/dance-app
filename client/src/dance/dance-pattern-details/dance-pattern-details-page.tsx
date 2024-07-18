import { useLocation, useParams } from "react-router";
import { ErrorPage } from "../../common/ErrorPage";
import { DancePatternDetailsView } from "./dance-pattern-details-view";

type RouteParams = {
  dancePatternId: string;
};

export const DancePatternDetailsPage = () => {
  const location = useLocation();
  const params = useParams<RouteParams>();
  if (!params.dancePatternId) {
    const message = "Dance pattern ID is required";
    return <ErrorPage message={message} />;
  }

  const id = parseInt(params.dancePatternId);
  const returnUrl: string | undefined = location.state?.returnUrl;
  const scrollY = location.state?.scrollY ?? 0;

  return (
    <DancePatternDetailsView id={id} returnUrl={returnUrl} scrollY={scrollY} />
  );
};
