
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dataprovider.Models;

public class Dance
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public List<DancePattern> DancePatterns { get; set; } = new List<DancePattern>();
}

