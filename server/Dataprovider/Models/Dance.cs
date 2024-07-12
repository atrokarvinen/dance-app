
namespace Dataprovider.Models;

public class Dance
{
    public int DanceId { get; set; }
    public string Name { get; set; } = string.Empty;

    public List<DancePattern> DancePatterns { get; set; } = new List<DancePattern>();
}

