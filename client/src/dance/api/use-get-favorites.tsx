import { gql, useQuery } from "@apollo/client";
import { FavoritePattern } from "../dance";

const query = gql`
  query GetFavorites {
    favoritePatterns {
      id
      dancePatternId
      dancePattern {
        id
        name
        danceId
        dance {
          id
          name
        }
      }
    }
  }
`;

type GetFavoritesResponse = {
  favoritePatterns: FavoritePattern[];
};

export const useGetFavorites = () => {
  const queryResult = useQuery<GetFavoritesResponse>(query);

  return {
    favorites: queryResult.data?.favoritePatterns ?? [],
    ...queryResult,
  };
};
