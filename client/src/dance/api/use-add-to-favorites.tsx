import { gql, useMutation } from "@apollo/client";
import { getErrorMessage } from "../../common/api/error-handling";
import { ApiError } from "../../common/api/models";
import { addMessage } from "../../common/toast/toast-store";
import { useAppDispatch } from "../../redux/store";

const mutation = gql`
  mutation AddFavorite($input: AddFavoriteInput!) {
    addFavorite(input: $input) {
      favoritePattern {
        id
        dancePatternId
      }
      errors {
        ... on FavoritePatternError {
          message
        }
      }
    }
  }
`;

type AddToFavoritesResponse = {
  addFavorite: {
    favoritePattern: {
      __typename: "FavoritePattern";
      id: number;
      dancePatternId: number;
    } | null;
    errors: ApiError[] | null;
  };
};

type AddToFavoritesVariables = {
  input: { dancePatternId: number };
};

export const useAddToFavorites = () => {
  const dispatch = useAppDispatch();
  const [mutationFunction] = useMutation<
    AddToFavoritesResponse,
    AddToFavoritesVariables
  >(mutation);

  const mutate = async (dancePatternId: number) => {
    const { data } = await mutationFunction({
      variables: { input: { dancePatternId } },
      optimisticResponse: {
        addFavorite: {
          favoritePattern: {
            __typename: "FavoritePattern",
            dancePatternId,
            id: 99,
          },
          errors: null,
        },
      },
      update: (cache, { data }) => {
        if (!data) return;
        cache.modify({
          fields: {
            favoritePatterns(existingFavorites = []) {
              console.log("new data:", data.addFavorite.favoritePattern);

              const newFavoriteRef = cache.writeFragment({
                data: data.addFavorite.favoritePattern,
                fragment: gql`
                  fragment NewFavorite on FavoritePattern {
                    id
                    dancePatternId
                  }
                `,
              });

              return [...existingFavorites, newFavoriteRef];
            },
          },
        });
      },
    });
    return { data };
  };

  const addToFavorites = async (dancePatternId: number) => {
    try {
      const { data } = await mutate(dancePatternId);
      if (!data) {
        console.error("No data returned from add to favorites mutation");
        return;
      }
      const errorMessage = getErrorMessage(data.addFavorite.errors);
      if (errorMessage) {
        dispatch(addMessage({ message: errorMessage, type: "error" }));
        return;
      }
      console.log(`Successfully added to favorites`);
      return data.addFavorite.favoritePattern;
    } catch (error) {
      const message = "Failed to add to favorites";
      dispatch(addMessage({ message, type: "error" }));
    }
  };

  return { addToFavorites };
};
