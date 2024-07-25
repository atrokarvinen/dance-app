import { gql, useMutation } from "@apollo/client";
import { getErrorMessage } from "../../common/api/error-handling";
import { ApiError } from "../../common/api/models";
import { addMessage } from "../../common/toast/toast-store";
import { useAppDispatch } from "../../redux/store";

const mutation = gql`
  mutation AddDance($input: AddDanceInput!) {
    addDance(input: $input) {
      dance {
        id
        name
      }
      errors {
        ... on BlobError {
          message
        }
      }
    }
  }
`;

type AddDanceMutationResponse = {
  addDance: {
    dance: { id: number; name: string } | null;
    errors: ApiError[] | null;
  };
};

type AddDanceMutationVariables = {
  input: {
    name: string;
    imageBase64?: string;
    imageUrl?: string;
  };
};

export const useAddDance = () => {
  const dispatch = useAppDispatch();
  const [mutationFunc, { loading }] = useMutation<
    AddDanceMutationResponse,
    AddDanceMutationVariables
  >(mutation);

  const addDance = async (values: AddDanceMutationVariables["input"]) => {
    let errorMessage;
    try {
      const { data } = await mutationFunc({
        variables: { input: values },
        update: (cache, { data }) => {
          if (!data || !data.addDance.dance) return;
          cache.modify({
            fields: {
              dances(existingDances = []) {
                const newDanceRef = cache.writeFragment({
                  data: data.addDance.dance,
                  fragment: gql`
                    fragment NewDance on Dance {
                      id
                      name
                    }
                  `,
                });
                return [...existingDances, newDanceRef];
              },
            },
          });
        },
      });
      if (!data) throw new Error("No data returned");
      const errorMessage = getErrorMessage(data.addDance.errors);
      if (errorMessage) {
        dispatch(addMessage({ type: "error", message: errorMessage }));
        return;
      }
      return data.addDance.dance;
    } catch (error) {
      errorMessage = error;
    }
    if (errorMessage) {
      const message = "Failed to create new dance";
      dispatch(addMessage({ type: "error", message }));
      return;
    }
  };

  return { addDance, loading };
};
