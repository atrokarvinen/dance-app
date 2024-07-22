using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dataprovider.Models;

public class DancePatternVariation
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public int OriginalId { get; set; }
    [ForeignKey(nameof(OriginalId))]
    public DancePattern Original { get; set; } = null!;

    public int VariationId { get; set; }
    [ForeignKey(nameof(VariationId))]
    public DancePattern Variation { get; set; } = null!;
}
