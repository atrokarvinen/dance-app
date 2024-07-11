import { Book } from "./book";

export type Props = {
  selectedBook: Book | undefined;
  onBookDeleted: (book: Book) => void;
};

export const DeleteView = ({ selectedBook, onBookDeleted }: Props) => {
  return (
    <div>
      <span>DeleteView</span>
      {selectedBook && (
        <div>
          <p>
            Are you sure you want to delete the book "{selectedBook?.title}"?
          </p>
          <button onClick={() => onBookDeleted(selectedBook)}>Delete</button>
        </div>
      )}
    </div>
  );
};
