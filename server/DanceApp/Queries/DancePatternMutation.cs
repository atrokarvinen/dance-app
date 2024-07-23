using Dataprovider.Exceptions;
using Dataprovider.Models;
using Dataprovider.Repositories;

namespace DanceApp.Queries;

[ExtendObjectType("Mutation")]
public class DancePatternMutation
{
    [Error<NotFoundException>]
    public DancePattern AddDancePattern(
        [Service] DancePatternRepository repository,
        string name,
        [ID] int danceId
        )
    {
        var dancePattern = new DancePattern
        {
            Name = name,
            DanceId = danceId,
        };
        repository.AddDancePattern(dancePattern);
        return dancePattern;
    }

    [Error<NotFoundException>]
    public DancePattern UpdateDancePattern(
        [Service] DancePatternRepository repository,
        [ID] int id,
        string name,
        [ID] int danceId
        )
    {
        var dancePattern = new DancePattern
        {
            Id = id,
            Name = name,
            DanceId = danceId,
        };
        repository.UpdateDancePattern(dancePattern);
        return dancePattern;
    }

    [Error<NotFoundException>]
    public DancePattern DeleteDancePattern(
        [Service] DancePatternRepository repository, 
        [ID] int id)
    {
        var dancePattern = repository.DeleteDancePattern(id);
        if (dancePattern is null)
        {
            throw new NotFoundException("Dance pattern not found");
        }
        return dancePattern;
    }
}
