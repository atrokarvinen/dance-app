import { Book } from "../book";

type BookInput = {
  id?: number;
  title: string;
  authorId: number;
};

export type AddBookInput = { input: BookInput };
export type UpdateBookInput = { input: BookInput };
export type DeleteBookInput = { bookId: number };

export type GetBooksResponse = { books: Book[] };
export type AddBookResponse = { addBook: Book };
export type UpdateBookResponse = { updateBook: Book };
export type DeleteBookResponse = { deleteBook: Book };
