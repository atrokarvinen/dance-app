import { gql, useMutation } from "@apollo/client";
import { addMessage } from "../../common/toast/toast-store";
import { useAppDispatch } from "../../redux/store";

const mutation = gql`
  mutation DeleteDancePattern($input: DeleteDancePatternInput!) {
    deleteDancePattern(input: $input) {
      dancePattern {
        id
        danceId
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
