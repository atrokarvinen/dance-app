import { gql, useMutation } from "@apollo/client";
import { addMessage } from "../../common/toast/toast-store";
import { useAppDispatch } from "../../redux/store";

const mutation = gql`
  mutation UpdateDance($input: UpdateDanceInput!) {
    updateDance(input: $input) {
      dance {
        id
        name
      }
    }
  }
`;

type UpdateDanceMutationResponse = {
  __typename: string;
  updateDance: {
    __typename: string;
    dance: { __typename: string; id: number; name: string } | null;
  };
};

type UpdateDanceMutationVariables = {
  input: {
    id: number;
    name: string;
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
      const { data } = await mutationFunc({
        variables: { input: values },
        update: (cache, { data }) => {
          if (!data) return;
          cache.modify({
            fields: {
              dances(existingDances = []) {
                const updatedDanceRef = cache.writeFragment({
                  data: data.updateDance.dance,
                  fragment: gql`
                    fragment UpdatedDance on Dance {
                      id
                      name
                    }
                  `,
                });
                return existingDances.map((d: any) =>
                  d.id === values.id ? updatedDanceRef : d
                );
              },
            },
          });
        },
      });
      if (!data) throw new Error("No data returned");
      return data.updateDance.dance;
    } catch (error) {
      errorMessage = error;
    }
    if (errorMessage) {
      const message = "Failed to update dance";
      dispatch(addMessage({ type: "error", message }));
      return;
    }
  };

  return { updateDance, loading };
};
