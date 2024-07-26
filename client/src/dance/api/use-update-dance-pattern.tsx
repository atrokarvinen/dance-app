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
        description
        videoUrl
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
      description?: string;
      videoUrl?: string;
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
            description: values.description,
            videoUrl: values.videoUrl,
          },
          errors: null,
        },
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
