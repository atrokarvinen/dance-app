using Dataprovider.Models;
using Dataprovider.Services;

namespace GraphQlApi.Queries;

[ExtendObjectType("Query")]
public class DanceQuery
{
    public IEnumerable<Dance> GetDances([Service] DanceRepository repository)
    {
        var dances = repository.GetDances();
        return dances;
    }

    public Dance GetDance([Service] DanceRepository repository, int danceId)
    {
        var dance = repository.GetDanceById(danceId);
        return dance;
    }
}
