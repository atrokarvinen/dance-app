using Dataprovider.Models;
using Dataprovider.Services;
using GraphQlApi.Inputs;

namespace GraphQlApi.Queries;

[ExtendObjectType("Mutation")]
public class DanceMutation
{
    public Dance AddDance([Service] DanceRepository repository, DanceInput input)
    {
        var dance = new Dance { Name = input.Name };
        repository.AddDance(dance);
        return dance;
    }

    public Dance UpdateDance([Service] DanceRepository repository, DanceInput input)
    {
        if (input.DanceId is null)
        {
            throw new ArgumentNullException(nameof(input.DanceId));
        }
        var dance = new Dance { DanceId = input.DanceId.Value, Name = input.Name };
        repository.UpdateDance(dance);
        return dance;
    }

    public Dance DeleteDance([Service] DanceRepository repository, [ID] int danceId)
    {
        var dance = repository.DeleteDance(danceId);
        return dance;
    }
}
