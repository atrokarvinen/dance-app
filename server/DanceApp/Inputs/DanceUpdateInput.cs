namespace DanceApp.Inputs;

public class DanceUpdateInput
{
    [ID]
    public int DanceId { get; set; }
    public string Name { get; set; } = string.Empty;
}
