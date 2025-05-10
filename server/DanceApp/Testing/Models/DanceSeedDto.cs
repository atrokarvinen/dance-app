namespace DanceApp.Testing.Models;

public record DanceSeedDto(string Name, IEnumerable<DancePatternSeedDto>? Patterns);
public record DancePatternSeedDto(string Name, string? Description, string? VideoUrl);
