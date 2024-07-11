import { gql, useQuery } from "@apollo/client";
import { GetBooksResponse } from "./models";

const GET_BOOKS = gql`
  query GetBooks {
    books {
      bookId
      title
      authorId
    }
  }
`;

export const useGetBooksQuery = () => {
  const { loading, error, data } = useQuery<GetBooksResponse>(GET_BOOKS);

  return {
    loading,
    error,
    books: data?.books,
  };
};
