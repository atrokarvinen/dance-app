using Dataprovider.Models;
using Microsoft.EntityFrameworkCore;

namespace Dataprovider
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Dance> Dances { get; set; }
        public DbSet<DancePattern> DancePatterns { get; set; }
        public DbSet<DancePatternVariation> DancePatternVariations { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<FavoritePattern> FavoritePatterns { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=dances.db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            DataSeeder.Seed(modelBuilder);
        }
    }
}
