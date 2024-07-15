import { gql, useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Dance } from "./dance";
import { DanceDetails } from "./dance-details";

type RouteParams = {
  danceId: string;
};

const query = gql`
  query GetDance($danceId: ID!) {
    dance(danceId: $danceId) {
      danceId
      name
      dancePatterns {
        dancePatternId
        name
        description
        imageUrl
        videoUrl
      }
    }
  }
`;

type GetDanceResponse = {
  dance: Dance;
};

type GetDanceVariables = {
  danceId: number;
};

export const DanceDetailsView = () => {
  const { danceId } = useParams<RouteParams>();
  const [getDance, { data, loading, error }] = useLazyQuery<
    GetDanceResponse,
    GetDanceVariables
  >(query);
  if (!danceId) {
    return <div>Invalid dance ID '{danceId}'</div>;
  }
  const id = parseInt(danceId);
  if (!data && !loading && !error) {
    getDance({ variables: { danceId: id } });
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;

  const dance = data?.dance;
  if (!dance) {
    return <div>Dance not found</div>;
  }

  return <DanceDetails dance={dance} />;
};
