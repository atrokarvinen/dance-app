import { gql, useMutation } from "@apollo/client";
import { addMessage } from "../../common/toast/toast-store";
import { useAppDispatch } from "../../redux/store";

const mutation = gql`
  mutation AddDance($input: AddDanceInput!) {
    addDance(input: $input) {
      dance {
        id
        name
      }
    }
  }
`;

type AddDanceMutationResponse = {
  __typename: string;
  addDance: {
    __typename: string;
    dance: { __typename: string; id: number; name: string } | null;
  };
};

type AddDanceMutationVariables = {
  input: {
    name: string;
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
          if (!data) return;
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
