import { gql, useMutation } from "@apollo/client";
import { getErrorMessage } from "../../common/api/error-handling";
import { ApiError } from "../../common/api/models";
import { addMessage } from "../../common/toast/toast-store";
import { useAppDispatch } from "../../redux/store";

const mutation = gql`
  mutation UpdateDance($input: UpdateDanceInput!) {
    updateDance(input: $input) {
      dance {
        id
        name
        imageUrl
      }
      errors {
        ... on BlobError {
          message
        }
      }
    }
  }
`;

type UpdateDanceMutationResponse = {
  updateDance: {
    dance: { id: number; name: string } | null;
    errors: ApiError[] | null;
  };
};

type UpdateDanceMutationVariables = {
  input: {
    id: number;
    name: string;
    imageBase64?: string;
    imageUrl?: string;
  };
};

export const useUpdateDance = () => {
  const dispatch = useAppDispatch();
  const [mutationFunc, { loading }] = useMutation<
    UpdateDanceMutationResponse,
    UpdateDanceMutationVariables
  >(mutation);

  const updateDance = async (values: UpdateDanceMutationVariables["input"]) => {
    let errorMessage;
    try {
      const { data } = await mutationFunc({ variables: { input: values } });
      if (!data) throw new Error("No data returned");
      const errorMessage = getErrorMessage(data.updateDance.errors);
      if (errorMessage) {
        dispatch(addMessage({ type: "error", message: errorMessage }));
        return;
      }
      return data.updateDance.dance;
    } catch (error) {
      errorMessage = error;
    }
    if (errorMessage) {
      const message = "Failed to update dance";
      dispatch(addMessage({ type: "error", message }));
    }
  };

  return { updateDance, loading };
};
