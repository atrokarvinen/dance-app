export type Book = {
  bookId: number;
  title: string;
  authorId: number;
  author?: Author;
};

export type Author = {
  authorId: number;
  name: string;
};

export const defaultBook: Book = {
  bookId: 0,
  title: "",
  authorId: 1,
};
