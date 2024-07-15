import { gql, useQuery } from "@apollo/client";
import { FavoritePattern } from "../dance";

export const GET_FAVORITES = "GetFavorites";

const query = gql`
  query ${GET_FAVORITES} {
    favorites {
      favoritePatternId
      dancePatternId
      dancePattern {
        name
      }
    }
  }
`;

type GetFavoritesResponse = {
  favorites: FavoritePattern[];
};

export const useGetFavorites = () => {
  const { loading, error, data } = useQuery<GetFavoritesResponse>(query);

  return { loading, error, favorites: data?.favorites ?? [] };
};
