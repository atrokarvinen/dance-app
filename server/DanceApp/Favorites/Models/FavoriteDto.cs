namespace DanceApp.Favorites.Models;

public record FavoriteDto(int Id, int DancePatternId);

public class CreateFavoriteDto
{
    public int DancePatternId { get; set; } 
}

