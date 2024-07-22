import { gql, useMutation } from "@apollo/client";
import { getErrorMessage } from "../../common/api/error-handling";
import { ApiError } from "../../common/api/models";
import { addMessage } from "../../common/toast/toast-store";
import { useAppDispatch } from "../../redux/store";
import { FavoritePattern } from "../dance";

const mutation = gql`
  mutation RemoveFavorite($input: RemoveFavoriteInput!) {
    removeFavorite(input: $input) {
      favoritePattern {
        id
        dancePatternId
      }
      errors {
        ... on FavoritePatternError {
          message
        }
        ... on NotFoundError {
          message
        }
        ... on UnauthorizedError {
          message
        }
      }
    }
  }
`;

type RemoveFromFavoritesResponse = {
  removeFavorite: {
    favoritePattern: {
      __typename: "FavoritePattern";
      id: number;
      dancePatternId: number;
    } | null;
    errors: ApiError[] | null;
  };
};

type RemoveFromFavoritesVariables = {
  input: { id: number };
};

export const useRemoveFromFavorites = () => {
  const dispatch = useAppDispatch();
  const [mutationFunction] = useMutation<
    RemoveFromFavoritesResponse,
    RemoveFromFavoritesVariables
  >(mutation);

  const mutate = async (id: number) => {
    const { data } = await mutationFunction({
      variables: { input: { id } },
      optimisticResponse: {
        removeFavorite: {
          favoritePattern: {
            __typename: "FavoritePattern",
            dancePatternId: -1,
            id,
          },
          errors: null,
        },
      },
      update: (cache, { data }) => {
        if (!data) return;
        cache.modify({
          fields: {
            favoritePatterns(existingFavorites = [], { readField }) {
              const filteredFavorites = existingFavorites.filter(
                (f: FavoritePattern) => {
                  return readField("id", f) !== id;
                }
              );
              return filteredFavorites;
            },
          },
        });
      },
    });
    return data;
  };

  const removeFromFavorites = async (id: number) => {
    try {
      const data = await mutate(id);
      if (!data) {
        console.error("No data returned from remove from favorites mutation");
        return;
      }
      const errorMessage = getErrorMessage(data.removeFavorite.errors);
      if (errorMessage) {
        dispatch(addMessage({ message: errorMessage, type: "error" }));
        return;
      }
      console.log(`Successfully removed from favorites`);
      return data.removeFavorite.favoritePattern;
    } catch (error) {
      const message = "Failed to remove from favorites";
      dispatch(addMessage({ type: "error", message }));
    }
  };

  return { removeFromFavorites };
};
