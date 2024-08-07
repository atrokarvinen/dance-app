import { gql, useQuery } from "@apollo/client";
import { DancePattern } from "../dance";

export const GET_DANCE_PATTERN = "GetDancePattern";

const query = gql`
  query ${GET_DANCE_PATTERN}($id: ID!) {
    dancePattern(id: $id) {
      dancePattern {
        id
        danceId
        name
        description
        videoUrl
        imageUrl
      }
      isFavorite
    }
  }
`;

export type GetDancePatternResponse = {
  dancePattern: {
    dancePattern: DancePattern;
    isFavorite: boolean;
  };
};

export type GetDancePatternVariables = {
  id: number;
};

type Props = { id: number };

export const useGetDancePattern = ({ id }: Props) => {
  const queryResult = useQuery<
    GetDancePatternResponse,
    GetDancePatternVariables
  >(query, { variables: { id } });

  let dancePattern: DancePattern | undefined;
  const { data } = queryResult;
  if (data?.dancePattern) {
    dancePattern = {
      ...data.dancePattern.dancePattern,
      isFavorite: data.dancePattern.isFavorite,
    };
  }
  return { ...queryResult, dancePattern };
};
