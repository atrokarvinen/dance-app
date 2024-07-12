using Dataprovider.Models;
using Microsoft.EntityFrameworkCore;

namespace Dataprovider
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Dance> Dances { get; set; }
        public DbSet<DancePattern> DancePatterns { get; set; }
        public DbSet<DancePatternVariation> DancePatternVariations { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<FavoritePattern> FavoritePatterns { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=books.db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            BookSeeder.Seed(modelBuilder);
            DataSeeder.Seed(modelBuilder);
        }
    }
}
