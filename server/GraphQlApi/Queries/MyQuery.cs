using GraphQlApi.Models;

namespace GraphQlApi.Queries;

public class MyQuery
{
    public Book GetBook() =>
        new Book
        {
            Title = "C# in depth.",
            Author = new Author
            {
                Name = "Jon Skeet"
            }
        };
}
