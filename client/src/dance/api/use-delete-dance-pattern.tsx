import { gql, useMutation } from "@apollo/client";
import { getErrorMessage } from "../../common/api/error-handling";
import { ApiError } from "../../common/api/models";
import { addMessage } from "../../common/toast/toast-store";
import { useAppDispatch } from "../../redux/store";

const mutation = gql`
  mutation DeleteDancePattern($input: DeleteDancePatternInput!) {
    deleteDancePattern(input: $input) {
      dancePattern {
        id
        danceId
      }
      errors {
        ... on UnauthorizedError {
          message
        }
      }
    }
  }
`;

type DeleteDancePatternResponse = {
  deleteDancePattern: {
    dancePattern: {
      __typename: "DancePattern";
      id: number;
      danceId: number;
    } | null;
    errors: ApiError[] | null;
  };
};

type DeleteDancePatternVariables = {
  input: { id: number };
};

export const useDeleteDancePattern = () => {
  const dispatch = useAppDispatch();
  const [mutationFunc, { loading }] = useMutation<
    DeleteDancePatternResponse,
    DeleteDancePatternVariables
  >(mutation);

  const mutate = async (values: DeleteDancePatternVariables["input"]) => {
    return mutationFunc({
      variables: { input: values },
      update: (cache, { data }) => {
        if (!data) return;
        if (!data.deleteDancePattern.dancePattern) return;
        if (data.deleteDancePattern.errors) return;
        const danceId = data.deleteDancePattern.dancePattern.danceId;
        const id = data.deleteDancePattern.dancePattern.id;
        cache.modify({
          id: `Dance:${danceId}`,
          fields: {
            dancePatterns(existingPatterns = [], { readField }) {
              return existingPatterns.filter(
                (pattern: any) => readField("id", pattern) !== id
              );
            },
          },
        });

        cache.evict({ id: `DancePattern:${values.id}` });
      },
    });
  };

  const deleteDancePattern = async (id: number) => {
    let errorMessage;
    try {
      const { data } = await mutate({ id });
      if (!data) throw new Error("No data returned");
      errorMessage = getErrorMessage(data.deleteDancePattern.errors);
      if (errorMessage) {
        dispatch(addMessage({ type: "error", message: errorMessage }));
        return;
      }
      return data.deleteDancePattern.dancePattern;
    } catch (error) {
      errorMessage = error;
    }
    if (errorMessage) {
      const message = "Failed to delete dance pattern";
      dispatch(addMessage({ type: "error", message }));
    }
  };

  return { deleteDancePattern, loading };
};
