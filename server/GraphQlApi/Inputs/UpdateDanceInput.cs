namespace GraphQlApi.Inputs;

public class UpdateDanceInput
{
    [ID]
    public int DanceId { get; set; }
    public string Name { get; set; } = string.Empty;
}
