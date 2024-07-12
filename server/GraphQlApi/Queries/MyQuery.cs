using Dataprovider;
using Dataprovider.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GraphQlApi.Queries;

[ExtendObjectType("Query")]
public class MyQuery
{
    public IEnumerable<Book> GetBooks([Service] DatabaseContext dbContext)
    {
        var books = dbContext.Books
            .Include(x => x.Author)
            .ToList();
        return books;
    }

    public Book GetBook([Service] DatabaseContext dbContext, int bookId)
    {
        var book = dbContext.Books
            .Include(x => x.Author)
            .FirstOrDefault(b => b.BookId == bookId);
        return book;
    }

    public List<Author> GetAuthors([Service] DatabaseContext dbContext)
    {
        var authors = dbContext.Authors
            .Include(x => x.Books)
            .ToList();
        return authors;
    }
}
