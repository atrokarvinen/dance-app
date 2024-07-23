using Dataprovider.Models;
using Dataprovider.Repositories;

namespace DanceApp.Queries;

[ExtendObjectType("Query")]
public class DanceQuery
{
    public IEnumerable<Dance> GetDances([Service] DanceRepository repository)
    {
        var dances = repository.GetDances();
        return dances;
    }

    public Dance GetDance([Service] DanceRepository repository, [ID] int id)
    {
        var dance = repository.GetDanceById(id);
        return dance;
    }
}
