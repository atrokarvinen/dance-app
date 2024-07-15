using Dataprovider.Models;

namespace GraphQlApi.Outputs;

public class GetDancePatternOutput
{
    public DancePattern DancePattern { get; set; } = new DancePattern();
    public bool? IsFavorite { get; set; }
}
