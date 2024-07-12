using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dataprovider.Models;

public class UserArchivedPattern
{
    public int UserArchivedPatternId { get; set; }
    public DateTime ArchivedDate { get; set; }
    public string? Notes { get; set; }
    
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    
    public int DancePatternId { get; set; }
    public DancePattern DancePattern { get; set; } = null!;
}
