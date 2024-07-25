import { gql, useMutation } from "@apollo/client";
import { getErrorMessage } from "../../common/api/error-handling";
import { ApiError } from "../../common/api/models";
import { addMessage } from "../../common/toast/toast-store";
import { useAppDispatch } from "../../redux/store";

const mutation = gql`
  mutation DeleteDance($input: DeleteDanceInput!) {
    deleteDance(input: $input) {
      dance {
        id
        name
      }
      errors {
        ... on NotFoundError {
          message
        }
        ... on BlobError {
          message
        }
      }
    }
  }
`;

type DeleteDanceResponse = {
  deleteDance: {
    dance: { id: number; __typename: "Dance"; name: string } | null;
    errors: ApiError[] | null;
  };
};

type DeleteDanceVariables = {
  input: { danceId: number };
};

export const useDeleteDance = () => {
  const dispatch = useAppDispatch();
  const [mutationFunc] = useMutation<DeleteDanceResponse, DeleteDanceVariables>(
    mutation
  );

  const deleteDance = async (danceId: number) => {
    let errorMessage;
    try {
      const { data } = await mutationFunc({
        variables: { input: { danceId } },
        optimisticResponse: {
          deleteDance: {
            dance: { id: danceId, __typename: "Dance", name: "" },
            errors: null,
          },
        },
        update: (cache, { data }) => {
          if (!data) return;
          cache.modify({
            fields: {
              dances(existingDances = [], { readField }) {
                return existingDances.filter((danceRef: any) => {
                  return danceId !== readField("id", danceRef);
                });
              },
            },
          });
          cache.evict({ id: `Dance:${danceId}` });
        },
      });
      if (!data) throw new Error("No data returned");

      errorMessage = getErrorMessage(data.deleteDance.errors);
      if (errorMessage) {
        dispatch(addMessage({ type: "error", message: errorMessage }));
        return;
      }

      console.log("Deleted dance", data.deleteDance.dance?.name);

      return data.deleteDance.dance;
    } catch (error) {
      errorMessage = error;
    }

    if (errorMessage) {
      const message = "Failed to delete dance";
      dispatch(addMessage({ type: "error", message }));
      return;
    }
  };

  return { deleteDance };
};
