import { gql, useMutation } from "@apollo/client";
import { AddBookInput, AddBookResponse } from "./models";

const ADD_BOOK = gql`
  mutation AddBook($input: BookInput!) {
    addBook(input: $input) {
      bookId
      title
      authorId
    }
  }
`;

export const useAddBook = () => {
  const [mutateFunction, { data, loading, error }] = useMutation<
    AddBookResponse,
    AddBookInput
  >(ADD_BOOK);

  return {
    addBook: mutateFunction,
    loading,
    error,
    book: data,
  };
};
