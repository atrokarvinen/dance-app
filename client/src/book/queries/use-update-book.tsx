import { gql, useMutation } from "@apollo/client";
import { UpdateBookInput, UpdateBookResponse } from "./models";

const UPDATE_BOOK = gql`
  mutation UpdateBook($input: BookInput!) {
    updateBook(input: $input) {
      bookId
      title
      authorId
    }
  }
`;

export const useUpdateBook = () => {
  const [mutateFunction, { loading, error, data }] = useMutation<
    UpdateBookResponse,
    UpdateBookInput
  >(UPDATE_BOOK);

  return {
    updateBook: mutateFunction,
    loading,
    error,
    book: data?.updateBook,
  };
};
