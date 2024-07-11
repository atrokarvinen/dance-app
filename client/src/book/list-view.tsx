import { Book } from "./book";

export type Props = {
  books: Book[];
  onBookSelected: (book: Book) => void;
};

export const ListView = ({ books, onBookSelected }: Props) => {
  return (
    <div>
      <span>ListView</span>
      <ul>
        {books.map((book) => (
          <li key={book.bookId}>
            <button onClick={() => onBookSelected(book)}>
              <span>{book.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
