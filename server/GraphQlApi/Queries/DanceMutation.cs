using Dataprovider.Models;
using Dataprovider.Repositories;
using GraphQlApi.Inputs;

namespace GraphQlApi.Queries;

[ExtendObjectType("Mutation")]
public class DanceMutation
{
    public Dance AddDance([Service] DanceRepository repository, DanceAddInput input)
    {
        var dance = new Dance { Name = input.Name };
        repository.AddDance(dance);
        return dance;
    }

    public Dance UpdateDance([Service] DanceRepository repository, DanceUpdateInput input)
    {
        var dance = new Dance { DanceId = input.DanceId, Name = input.Name };
        repository.UpdateDance(dance);
        return dance;
    }

    public Dance DeleteDance([Service] DanceRepository repository, [ID] int danceId)
    {
        var dance = repository.DeleteDance(danceId);
        if (dance is null)
        {
            throw new Exception("Dance not found");
        }
        return dance;
    }
}
