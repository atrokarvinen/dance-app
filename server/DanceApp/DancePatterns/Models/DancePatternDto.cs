namespace DanceApp.DancePatterns.Models;

public record DancePatternDto(
    int Id,
    string Name,
    string? Description,
    string? VideoUrl,
    string? ImageUrl,
    int DanceId
    );


