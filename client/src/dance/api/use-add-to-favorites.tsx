import { gql, useMutation } from "@apollo/client";
import { getErrorMessage } from "../../common/api/error-handling";
import { ApiError } from "../../common/api/models";
import { addMessage } from "../../common/toast/toast-store";
import { useAppDispatch } from "../../redux/store";

const mutation = gql`
  mutation AddFavorite($input: AddFavoriteInput!) {
    addFavorite(input: $input) {
      favoritePattern {
        dancePatternId
        displayName
        favoritePatternId
        userId
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
      favoritePatternId: number;
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

  const addToFavorites = async (dancePatternId: number) => {
    const { data } = await mutationFunction({
      variables: { input: { dancePatternId } },
    });
    if (!data) {
      console.error("No data returned from add to favorites mutation");
      return;
    }
    const errorMessage = getErrorMessage(data.addFavorite.errors);
    if (errorMessage) {
      dispatch(addMessage({ message: errorMessage, type: "error" }));
      return;
    }
    console.log(
      `Successfully added to favorites: ${data.addFavorite.favoritePattern?.favoritePatternId}`
    );
    return data.addFavorite.favoritePattern;
  };

  return { addToFavorites };
};
