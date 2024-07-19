using Dataprovider.Exceptions;
using Dataprovider.Models;
using Dataprovider.Repositories;

namespace DanceApp.Queries;

[ExtendObjectType("Mutation")]
public class DanceMutation
{
    public Dance AddDance([Service] DanceRepository repository, string name)
    {
        var dance = new Dance { Name = name };
        repository.AddDance(dance);
        return dance;
    }

    public Dance UpdateDance([Service] DanceRepository repository, [ID] int danceId, string name)
    {
        var dance = new Dance { DanceId = danceId, Name = name };
        repository.UpdateDance(dance);
        return dance;
    }

    [Error<NotFoundException>]
    public Dance DeleteDance([Service] DanceRepository repository, [ID] int danceId)
    {
        var dance = repository.DeleteDance(danceId);
        if (dance is null)
        {
            throw new NotFoundException("Dance not found");
        }
        return dance;
    }
}
