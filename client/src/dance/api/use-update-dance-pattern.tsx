import { gql, useMutation } from "@apollo/client";
import { getErrorMessage } from "../../common/api/error-handling";
import { ApiError } from "../../common/api/models";
import { addMessage } from "../../common/toast/toast-store";
import { useAppDispatch } from "../../redux/store";

const mutation = gql`
  mutation UpdateDancePattern($input: UpdateDancePatternInput!) {
    updateDancePattern(input: $input) {
      dancePattern {
        id
        name
      }
    }
  }
`;

type UpdateDancePatternMutationResponse = {
  updateDancePattern: {
    dancePattern: {
      id: number;
      __typename: "DancePattern";
      name: string;
    } | null;
    errors: ApiError[] | null;
  };
};

type UpdateDancePatternMutationVariables = {
  input: {
    id: number;
    name: string;
    description?: string;
    videoUrl?: string;
    danceId: number;
  };
};

export const useUpdateDancePattern = () => {
  const dispatch = useAppDispatch();
  const [mutationFunc, { loading }] = useMutation<
    UpdateDancePatternMutationResponse,
    UpdateDancePatternMutationVariables
  >(mutation);

  const mutate = (values: UpdateDancePatternMutationVariables["input"]) => {
    return mutationFunc({
      variables: { input: values },
      optimisticResponse: {
        updateDancePattern: {
          dancePattern: {
            __typename: "DancePattern",
            id: values.id,
            name: values.name,
          },
          errors: null,
        },
      },
      update: (cache, { data }) => {
        if (!data) return;
        cache.modify({
          fields: {
            dancePatterns(existingDancePatterns = []) {
              const newDancePatternRef = cache.writeFragment({
                data: data.updateDancePattern.dancePattern,
                fragment: gql`
                  fragment NewDancePattern on DancePattern {
                    id
                    name
                  }
                `,
              });
              return existingDancePatterns.map((ref: any) =>
                ref.id === values.id ? newDancePatternRef : ref
              );
            },
          },
        });
      },
    });
  };

  const updateDancePattern = async (
    values: UpdateDancePatternMutationVariables["input"]
  ) => {
    try {
      const { data } = await mutate(values);
      if (!data) throw new Error("No data returned");
      const errorMessage = getErrorMessage(data.updateDancePattern.errors);
      if (errorMessage) {
        dispatch(addMessage({ type: "error", message: errorMessage }));
        return;
      }
      return data.updateDancePattern.dancePattern;
    } catch (error) {
      const message = "Failed to update dance pattern";
      dispatch(addMessage({ type: "error", message }));
    }
  };

  return { updateDancePattern, loading };
};
