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

  // const error = queryResult.error;
  // console.log("[useGetDances] error:", error);
  // console.log("[useGetDances] error graphQLErrors:", error?.graphQLErrors);
  // console.log("[useGetDances] error clientErrors:", error?.clientErrors);
  // console.log("[useGetDances] error extraInfo:", error?.extraInfo);
  // console.log("[useGetDances] error networkError:", error?.networkError);
  // console.log(
  //   "[useGetDances] error networkError.message:",
  //   error?.networkError?.message
  // );
  // console.log("[useGetDances] error protocolErrors:", error?.protocolErrors);
  // console.log("[useGetDances] error stack:", error?.stack);
  // console.log("[useGetDances] error message:", error?.message);

  return {
    ...queryResult,
    dances: queryResult.data?.dances ?? [],
  };
};
