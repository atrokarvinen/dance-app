
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Dataprovider.Models;

public class Dance
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int DanceId { get; set; }
    public string Name { get; set; } = string.Empty;

    public List<DancePattern> DancePatterns { get; set; } = new List<DancePattern>();
}

