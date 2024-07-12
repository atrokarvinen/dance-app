using Dataprovider.Models;
using Microsoft.EntityFrameworkCore;

namespace Dataprovider;

public class DataSeeder
{
    public static void Seed(ModelBuilder modelBuilder)
    {
        var dances = new List<Dance>()
        {
            new Dance() { DanceId = 1, Name = "Salsa", },
            new Dance() { DanceId = 2, Name = "Waltz", },
            new Dance() { DanceId = 3, Name = "Tango", },
        };

        var patterns = new List<DancePattern>()
        {
            new DancePattern()
            {
                DancePatternId = 1,
                Name = "Basic Step",
                Description = "Basic step for salsa",
                DanceId = 1,
            },
            new DancePattern()
            {
                DancePatternId = 2,
                Name = "Basic step variation",
                Description = "Alternative basic step",
                DanceId = 1,
            },
            new DancePattern()
            {
                DancePatternId = 3,
                Name = "Basic step",
                Description = "Basic step for waltz",
                DanceId = 2,
            },
        };

        var variations = new List<DancePatternVariation>()
        {
            new DancePatternVariation()
            {
                DancePatternVariationId = 1,
                OriginalId = 1,
                VariationId = 2,
            },
        };

        var users = new List<User>()
        {
            new User()
            {
                UserId = 1,
                Name = "John Doe",
                Password = "password",
            },
        };

        var favoritePatterns = new List<FavoritePattern>()
        {
            new FavoritePattern()
            {
                FavoritePatternId = 1,
                UserId = 1,
                DancePatternId = 1,
            },
        };

        modelBuilder.Entity<Dance>().HasData(dances);
        modelBuilder.Entity<DancePattern>().HasData(patterns);
        modelBuilder.Entity<DancePatternVariation>().HasData(variations);
        modelBuilder.Entity<User>().HasData(users);
        modelBuilder.Entity<FavoritePattern>().HasData(favoritePatterns);
    }
}
