import { useEffect, useState } from "react";
import { Book, defaultBook } from "./book";

export type Props = {
  defaultValues?: Book;
  onSubmit: (book: Book) => void;
};

export const Form = ({ defaultValues, onSubmit }: Props) => {
  const [book, setBook] = useState(defaultBook);

  useEffect(() => {
    if (defaultValues) {
      setBook(defaultValues);
    } else {
      setBook(defaultBook);
    }
  }, [defaultValues]);

  return (
    <div>
      <span>Form</span>
      <div>
        <label>Title</label>
        <input
          value={book.title}
          defaultValue={defaultValues?.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
        />
      </div>
      <div>
        <label>AuthorId</label>
        <input
          value={book.authorId}
          defaultValue={defaultValues?.authorId}
          onChange={(e) =>
            setBook({ ...book, authorId: parseInt(e.target.value) })
          }
        />
      </div>
      <button onClick={() => onSubmit(book)}>Submit</button>
    </div>
  );
};
