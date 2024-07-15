import { gql, useMutation } from "@apollo/client";
import { GET_DANCE_PATTERN } from "./use-get-dance-pattern";
import { GET_FAVORITES } from "./use-get-favorites";

const mutation = gql`
  mutation AddFavorite($input: FavoriteAddInput!) {
    addFavorite(input: $input) {
      favoritePatternId
      dancePatternId
    }
  }
`;

type AddToFavoritesResponse = {
  addToFavorites: {
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
      refetchQueries: [GET_DANCE_PATTERN, GET_FAVORITES],
    });
    if (!data || errors) {
      console.log("Error adding to favorites:", errors);
      return false;
    }
    console.log(
      `Successfully added to favorites: ${data.addToFavorites.favoritePatternId}`
    );
    return data.addToFavorites;
  };

  return { addToFavorites };
};
