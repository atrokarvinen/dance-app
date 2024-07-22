using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dataprovider.Models;

public class DancePattern
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Aliases { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? VideoUrl { get; set; }
    public string? ImageUrl { get; set; }

    public int DanceId { get; set; }
    public Dance Dance { get; set; } = null!;

    [InverseProperty(nameof(DancePatternVariation.Original))]
    public List<DancePatternVariation> Variations { get; set; } = new List<DancePatternVariation>();
    //public List<DancePattern> Predecessors { get; set; } = new List<DancePattern>();
    //public List<DancePattern> Successors { get; set; } = new List<DancePattern>();
    //public List<DancePattern> Counterparts { get; set; } = new List<DancePattern>();
}
