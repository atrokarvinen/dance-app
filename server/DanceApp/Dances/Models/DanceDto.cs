namespace DanceApp.Dances.Models;

public record DanceDto(int Id, string Name, string? ImageUrl);

public class CreateDanceDto
{
    public string Name { get; set; } = string.Empty;
    public string? ImageBase64 { get; set; }
    public string? ImageUrl { get; set; }
}

public class UpdateDanceDto : CreateDanceDto
{
    public int Id { get; set; }
}
