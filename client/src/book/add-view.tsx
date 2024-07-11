import { Book } from "./book";
import { Form } from "./form";

export type Props = {
  onAddBook: (book: Book) => void;
};

export const AddView = ({ onAddBook }: Props) => {
  return (
    <div>
      <span>AddView</span>
      <Form onSubmit={onAddBook} />
    </div>
  );
};
