using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dataprovider.Models;

public class DancePatternVariation
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int DancePatternVariationId { get; set; }

    public int OriginalId { get; set; }
    [ForeignKey(nameof(OriginalId))]
    public DancePattern Original { get; set; } = null!;

    public int VariationId { get; set; }
    [ForeignKey(nameof(VariationId))]
    public DancePattern Variation { get; set; } = null!;
}
