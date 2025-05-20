namespace DanceApp.DancePatterns.Models;

public record DancePatternDto(
    int Id, 
    string Name, 
    string? Description,
    string? VideoUrl,
    string? ImageUrl,
    int DanceId
    );

public class CreateDancePatternDto
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? VideoUrl { get; set; }
    public string? ImageUrl { get; set; }

    public int DanceId { get; set; }
}

public class UpdateDancePatternDto : CreateDancePatternDto
{
    public int Id { get; set; }
}
