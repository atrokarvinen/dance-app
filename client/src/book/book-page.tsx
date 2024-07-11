import { useEffect, useState } from "react";
import { AddView } from "./add-view";
import { Book } from "./book";
import { DeleteView } from "./delete-view";
import { EditView } from "./edit-view";
import { ListView } from "./list-view";
import { useAddBook } from "./queries/use-add-book";
import { useDeleteBook } from "./queries/use-delete-book";
import { useGetBooksQuery } from "./queries/use-get-books";
import { useUpdateBook } from "./queries/use-update-book";

export const BookPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();
  const { books: booksFromQuery, loading } = useGetBooksQuery();
  const { addBook } = useAddBook();
  const { deleteBook } = useDeleteBook();
  const { updateBook } = useUpdateBook();

  useEffect(() => {
    if (!loading && booksFromQuery) {
      setBooks(booksFromQuery);
    }
  }, [loading, booksFromQuery]);

  const handleAdd = async (book: Book) => {
    const input = {
      id: undefined,
      title: book.title,
      authorId: book.authorId,
    };
    const result = await addBook({ variables: { input } });
    if (result.errors) {
      console.error(result.errors);
      return;
    }
    const createdBook = result.data?.addBook!;
    console.log("Created book: ", createdBook);
    setBooks([...books, createdBook]);
  };

  const handleEdit = async (book: Book) => {
    const input = {
      id: book.bookId,
      title: book.title,
      authorId: book.authorId,
    };
    const result = await updateBook({ variables: { input } });
    if (result.errors) {
      console.error(result.errors);
      return;
    }
    const editedBook = result.data?.updateBook!;
    setBooks(
      books.map((b) => (b.bookId === editedBook.bookId ? editedBook : b))
    );
    setSelectedBook(undefined);
  };

  const handleDelete = async (book: Book) => {
    await deleteBook({ variables: { bookId: book.bookId } });
    setBooks(books.filter((b) => b.bookId !== book.bookId));
    setSelectedBook(undefined);
  };

  return (
    <div>
      <ListView
        books={books}
        onBookSelected={(book) => setSelectedBook(book)}
      />
      <AddView onAddBook={handleAdd} />
      <EditView selectedBook={selectedBook} onEditBook={handleEdit} />
      <DeleteView selectedBook={selectedBook} onBookDeleted={handleDelete} />
    </div>
  );
};
