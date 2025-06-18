namespace DanceApp.Favorites.Models;

public class FavoriteListItemDto
{
    public int Id { get; set; }
    public FavoriteListItemPatternDto DancePattern { get; set; } = new();
}

public class FavoriteListItemPatternDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public FavoriteListItemDanceDto Dance { get; set; } = new();

}

public class FavoriteListItemDanceDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}