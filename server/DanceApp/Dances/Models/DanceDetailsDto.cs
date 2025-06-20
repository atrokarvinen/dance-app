namespace DanceApp.Dances.Models;

public class DanceDetailsDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public List<DanceDetailsPatternDto> DancePatterns { get; set; } = [];
    public List<DanceDetailsFavoritePatternDto> Favorites { get; set; } = [];
}

public class DanceDetailsPatternDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? VideoUrl { get; set; }
    public required int DanceId { get; set; }
}

public class DanceDetailsFavoritePatternDto
{
    public int Id { get; set; }
    public int DancePatternId { get; set; }
}