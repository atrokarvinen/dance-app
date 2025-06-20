namespace DanceApp.DancePatterns.Models;

public class DancePatternDetailsDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? VideoUrl { get; set; }
    public string? ImageUrl { get; set; }
    public int DanceId { get; set; }
    
    public int? FavoriteId { get; set; }
    public bool IsFavorite { get; set; }
}
