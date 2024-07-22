import { gql, useQuery } from "@apollo/client";
import { Dance } from "../dance";

const query = gql`
  query GetDances {
    dances {
      id
      name
    }
  }
`;

type GetDancesResponse = {
  dances: Dance[];
};

export const useGetDances = () => {
  const queryResult = useQuery<GetDancesResponse>(query);

  return {
    ...queryResult,
    dances: queryResult.data?.dances ?? [],
  };
};
