import { gql, useMutation } from "@apollo/client";
import { DeleteBookInput, DeleteBookResponse } from "./models";

const DELETE_BOOK = gql`
  mutation DeleteBook($bookId: Int!) {
    deleteBook(bookId: $bookId) {
      bookId
      title
    }
  }
`;

export const useDeleteBook = () => {
  const [mutateFunction, { loading, error, data }] = useMutation<
    DeleteBookResponse,
    DeleteBookInput
  >(DELETE_BOOK);

  return {
    deleteBook: mutateFunction,
    loading,
    error,
    book: data?.deleteBook,
  };
};
