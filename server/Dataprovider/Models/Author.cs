using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dataprovider.Models;

public class Author
{
    public int AuthorId { get; set; }
    public string Name { get; set; } = string.Empty;

    public List<Book> Books { get; set; } = new List<Book>();
}
