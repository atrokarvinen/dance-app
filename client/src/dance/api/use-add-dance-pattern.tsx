import { gql, useMutation } from "@apollo/client";
import { getErrorMessage } from "../../common/api/error-handling";
import { ApiError } from "../../common/api/models";
import { addMessage } from "../../common/toast/toast-store";
import { useAppDispatch } from "../../redux/store";

const mutation = gql`
  mutation AddDancePattern($input: AddDancePatternInput!) {
    addDancePattern(input: $input) {
      dancePattern {
        id
        name
      }
    }
  }
`;

type AddDancePatternResponse = {
  addDancePattern: {
    dancePattern: {
      __typename: "DancePattern";
      id: number;
      name: string;
    } | null;
    errors: ApiError[] | null;
  };
};

type AddDancePatternVariables = {
  input: {
    name: string;
    description?: string;
    videoUrl?: string;
    danceId: number;
  };
};

export const useAddDancePattern = () => {
  const dispatch = useAppDispatch();
  const [mutationFunc, { loading }] = useMutation<
    AddDancePatternResponse,
    AddDancePatternVariables
  >(mutation);

  const mutate = (values: AddDancePatternVariables["input"]) => {
    return mutationFunc({
      variables: { input: values },
      optimisticResponse: {
        addDancePattern: {
          dancePattern: {
            __typename: "DancePattern",
            id: -1,
            name: values.name,
          },
          errors: null,
        },
      },
      update: (cache, { data }) => {
        if (!data) return;

        cache.modify({
          id: `Dance:${values.danceId}`,
          fields: {
            dancePatterns(existingPatterns = []) {
              const newPatternRef = cache.writeFragment({
                data: data.addDancePattern.dancePattern,
                fragment: gql`
                  fragment NewDancePattern on DancePattern {
                    id
                    name
                  }
                `,
              });
              return [...existingPatterns, newPatternRef];
            },
          },
        });
      },
    });
  };

  const addDancePattern = async (values: AddDancePatternVariables["input"]) => {
    try {
      const { data } = await mutate(values);
      if (!data) throw new Error("No data returned");
      const errorMessage = getErrorMessage(data.addDancePattern.errors);
      if (errorMessage) {
        dispatch(addMessage({ type: "error", message: errorMessage }));
        return;
      }
      return data.addDancePattern.dancePattern;
    } catch (error) {
      const message = "Failed to add dance pattern";
      dispatch(addMessage({ type: "error", message }));
    }
  };

  return { addDancePattern, loading };
};
