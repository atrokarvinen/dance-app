import { gql, useMutation } from "@apollo/client";

const mutation = gql`
  mutation AddFavorite($input: FavoriteAddInput!) {
    addFavorite(input: $input) {
      favoritePatternId
      dancePatternId
    }
  }
`;

type AddToFavoritesResponse = {
  addFavorite: {
    favoritePatternId: number;
    dancePatternId: number;
  };
};

type AddToFavoritesVariables = {
  input: { dancePatternId: number };
};

export const useAddToFavorites = () => {
  const [mutationFunction] = useMutation<
    AddToFavoritesResponse,
    AddToFavoritesVariables
  >(mutation);

  const addToFavorites = async (dancePatternId: number) => {
    const { data, errors } = await mutationFunction({
      variables: { input: { dancePatternId } },
    });
    if (!data || errors) {
      console.log("Error adding to favorites:", errors);
      return false;
    }
    console.log(
      `Successfully added to favorites: ${data.addFavorite.favoritePatternId}`
    );
    return data.addFavorite;
  };

  return { addToFavorites };
};
