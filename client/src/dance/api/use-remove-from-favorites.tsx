import { gql, useMutation } from "@apollo/client";

const mutation = gql`
  mutation RemoveFavorite($input: FavoriteRemoveInput!) {
    removeFavorite(input: $input) {
      favoritePatternId
      dancePatternId
    }
  }
`;

type RemoveFromFavoritesResponse = {
  removeFavorite: {
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
    });
    if (!data || errors) {
      console.log("Error removing from favorites:", errors);
      return false;
    }
    console.log(
      `Successfully removed from favorites: ${data.removeFavorite.favoritePatternId}`
    );
    return data.removeFavorite;
  };

  return { removeFromFavorites };
};
