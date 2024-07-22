import { gql, useQuery } from "@apollo/client";
import { Dance } from "../dance";

const query = gql`
  query GetDance($danceId: ID!) {
    dance(danceId: $danceId) {
      id
      name
      dancePatterns {
        id
        danceId
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

export const useGetDance = (danceId: number) => {
  const queryResult = useQuery<GetDanceResponse, GetDanceVariables>(query, {
    variables: { danceId },
  });

  return {
    dance: queryResult.data?.dance,
    ...queryResult,
  };
};
