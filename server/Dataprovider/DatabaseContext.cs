using Dataprovider.Models;
using Microsoft.EntityFrameworkCore;

namespace Dataprovider
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Authors { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=books.db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var books = new List<Book>()
            {
                new Book() 
                { 
                    BookId = 1, 
                    Title = "C# in depth.",
                    AuthorId = 1,
                },
                new Book() 
                { 
                    BookId = 2, 
                    Title = "Design Patterns.",
                    AuthorId = 2,
                },
            };
            modelBuilder.Entity<Book>().HasData(books);

            var authors = new List<Author>()
            {
                new Author ()
                {
                    AuthorId = 1,
                    Name = "Jon Skeet",
                },
                new Author () 
                { 
                    AuthorId = 2, 
                    Name = "Erich Gamma",
                },
            };
            modelBuilder.Entity<Author>().HasData(authors);
        }
    }
}
