namespace Dataprovider.Models;

public class FavoritePattern
{
    public int FavoritePatternId { get; set; }
    public string DisplayName { get; set; } = string.Empty;

    public int UserId { get; set; }
    public User User { get; set; } = null!;

    public int DancePatternId { get; set; }
    public DancePattern DancePattern { get; set; } = null!;
}
