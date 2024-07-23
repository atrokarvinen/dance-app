import { gql, useQuery } from "@apollo/client";
import { Dance } from "../dance";

const query = gql`
  query GetDance($id: ID!) {
    dance(id: $id) {
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
  id: number;
};

export const useGetDance = (danceId: number) => {
  const queryResult = useQuery<GetDanceResponse, GetDanceVariables>(query, {
    variables: { id: danceId },
  });

  return {
    dance: queryResult.data?.dance,
    ...queryResult,
  };
};
