using Dataprovider;
using Dataprovider.Models;
using GraphQlApi.Inputs;

namespace GraphQlApi.Queries;

public class MyMutation
{
    public Book AddBook([Service] DatabaseContext dbContext, BookInput input)
    {
        var (_, title, authorId) = input;
        var bookToCreate = new Book()
        {
            Title = title,
            AuthorId = authorId,
        };
        var created = dbContext.Books.Add(bookToCreate);
        dbContext.SaveChanges();
        return created.Entity;
    }

    public Book UpdateBook([Service] DatabaseContext dbContext, BookInput input)
    {
        var (bookId, title, authorId) = input;
        if (bookId is null)
        {
            throw new ArgumentNullException(nameof(bookId));
        }
        var book = dbContext.Books.FirstOrDefault(b => b.BookId == bookId);
        if (book is null)
        {
            throw new ArgumentNullException(nameof(book));
        }
        book.Title = title;
        book.AuthorId = authorId;
        dbContext.SaveChanges();
        return book;
    }

    public Book DeleteBook([Service] DatabaseContext dbContext, [ID] int bookId)
    {
        var book = dbContext.Books.FirstOrDefault(b => b.BookId == bookId);
        if (book == null)
        {
            throw new ArgumentNullException(nameof(book));
        }
        dbContext.Books.Remove(book);
        dbContext.SaveChanges();
        return book;
    }
}
