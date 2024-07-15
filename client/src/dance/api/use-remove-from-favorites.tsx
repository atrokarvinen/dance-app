import { gql, useMutation } from "@apollo/client";
import { GET_DANCE_PATTERN } from "./use-get-dance-pattern";
import { GET_FAVORITES } from "./use-get-favorites";

const mutation = gql`
  mutation RemoveFavorite($input: FavoriteRemoveInput!) {
    removeFavorite(input: $input) {
      favoritePatternId
      dancePatternId
    }
  }
`;

type RemoveFromFavoritesResponse = {
  removeFromFavorites: {
    favoritePatternId: number;
    dancePatternId: number;
  };
};

type RemoveFromFavoritesVariables = {
  input: { id: number };
};

export const useRemoveFromFavorites = () => {
  const [mutationFunction] = useMutation<
    RemoveFromFavoritesResponse,
    RemoveFromFavoritesVariables
  >(mutation);

  const removeFromFavorites = async (id: number) => {
    const { data, errors } = await mutationFunction({
      variables: { input: { id } },
      refetchQueries: [GET_DANCE_PATTERN, GET_FAVORITES],
    });
    if (!data || errors) {
      console.log("Error removing from favorites:", errors);
      return false;
    }
    console.log(
      `Successfully removed from favorites: ${data.removeFromFavorites.favoritePatternId}`
    );
    return data.removeFromFavorites;
  };

  return { removeFromFavorites };
};
