import { Book } from "./book";
import { Form } from "./form";

export type Props = {
  selectedBook: Book | undefined;
  onEditBook: (book: Book) => void;
};

export const EditView = ({ selectedBook, onEditBook }: Props) => {
  return (
    <div>
      <span>EditView</span>
      <Form defaultValues={selectedBook} onSubmit={onEditBook} />
    </div>
  );
};
