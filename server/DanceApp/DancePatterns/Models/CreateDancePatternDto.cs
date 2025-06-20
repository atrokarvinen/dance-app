namespace DanceApp.DancePatterns.Models;

public class CreateDancePatternDto
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? VideoUrl { get; set; }
    public string? ImageUrl { get; set; }

    public int DanceId { get; set; }
}

