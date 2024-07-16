using Dataprovider.Models;

namespace DanceApp.Outputs;

public class GetDancePatternOutput
{
    public DancePattern DancePattern { get; set; } = new DancePattern();
    public bool? IsFavorite { get; set; }
}
