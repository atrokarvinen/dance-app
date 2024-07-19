import { ApolloError, gql, useMutation } from "@apollo/client";

const mutation = gql`
  mutation AddDance($input: AddDanceInput!) {
    addDance(input: $input) {
      dance {
        danceId
        name
      }
      errors {
        __typename
        ... on DanceNameTakenError {
          message
        }
      }
    }
  }
`;

type AddDanceMutationResponse = {
  addDance: {
    danceId: number;
    name: string;
  };
};

type AddDanceMutationVariables = {
  input: {
    name: string;
  };
};

export const useAddDance = () => {
  const [mutationFunc] = useMutation<
    AddDanceMutationResponse,
    AddDanceMutationVariables
  >(mutation);

  const addDance = async (values: AddDanceMutationVariables["input"]) => {
    try {
      const { data, errors } = await mutationFunc({
        variables: { input: values },
      });
      if (errors || !data) {
        if (errors) {
          console.log("[useAddDance] errors:");
          console.log(errors);
          for (let i = 0; i < errors.length; i++) {
            const error = errors[i];
            console.log("[addDance] error.extensions:", error.extensions);
            console.log("[addDance] error.message:", error.message);
            console.log("[addDance] error.path:", error.path);
            console.log("[addDance] error.locations:", error.locations);
            console.log("[addDance] error.nodes:", error.nodes);
            console.log("[addDance] error.source:", error.source);
            console.log("[addDance] error.positions:", error.positions);
            console.log("[addDance] error.originalError:", error.originalError);
            console.log("[addDance] error.name:", error.name);
            console.log("[addDance] error.stack:", error.stack);
          }
        }

        return;
      }
      return data.addDance;
    } catch (genError) {
      console.log("[useAddDance] error:", genError);
      const error: ApolloError = genError as ApolloError;
      console.log("[useAddDance] error:", error);
      console.log("[useAddDance] error graphQLErrors:", error?.graphQLErrors);
      console.log("[useAddDance] error clientErrors:", error?.clientErrors);
      console.log("[useAddDance] error extraInfo:", error?.extraInfo);
      console.log("[useAddDance] error networkError:", error?.networkError);
      console.log(
        "[useAddDance] error networkError.message:",
        error?.networkError?.message
      );
      console.log("[useAddDance] error protocolErrors:", error?.protocolErrors);
      console.log("[useAddDance] error stack:", error?.stack);
      console.log("[useAddDance] error message:", error?.message);
    }
    return undefined;
  };

  return { addDance };
};
