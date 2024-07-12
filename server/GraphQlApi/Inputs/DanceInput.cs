namespace GraphQlApi.Inputs;

public class DanceInput
{
    [ID]
    public int? DanceId { get; set; }
    public string Name { get; set; } = string.Empty;
}
