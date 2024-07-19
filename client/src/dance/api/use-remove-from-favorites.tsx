import { gql, useMutation } from "@apollo/client";
import { getErrorMessage } from "../../common/api/error-handling";
import { ApiError } from "../../common/api/models";
import { addMessage } from "../../common/toast/toast-store";
import { useAppDispatch } from "../../redux/store";

const mutation = gql`
  mutation RemoveFavorite($input: RemoveFavoriteInput!) {
    removeFavorite(input: $input) {
      favoritePattern {
        favoritePatternId
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
      favoritePatternId: number;
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

  const removeFromFavorites = async (id: number) => {
    const { data } = await mutationFunction({ variables: { input: { id } } });
    if (!data) {
      console.error("No data returned from remove from favorites mutation");
      return;
    }
    const errorMessage = getErrorMessage(data.removeFavorite.errors);
    if (errorMessage) {
      dispatch(addMessage({ message: errorMessage, type: "error" }));
      return;
    }
    console.log(
      `Successfully removed from favorites: ${data.removeFavorite.favoritePattern?.favoritePatternId}`
    );
    return data.removeFavorite.favoritePattern;
  };

  return { removeFromFavorites };
};
