using DanceApp.Extensions;
using Dataprovider.Exceptions;
using Dataprovider.Models;
using Dataprovider.Repositories;
using System.Security.Claims;

namespace DanceApp.Queries;

[ExtendObjectType("Mutation")]
public class DancePatternMutation
{
    [Error<NotFoundException>]
    [Error<UnauthorizedException>]
    public async Task<DancePattern> AddDancePattern(
        [Service] DancePatternRepository repository,
        ClaimsPrincipal claims,
        string name,
        string? description,
        string? videoUrl,
        [ID] int danceId
        )
    {
        if (!claims.IsAdmin())
        {
            throw new UnauthorizedException("User is not authorized to add dance patterns");
        }
        var dancePattern = new DancePattern
        {
            Name = name,
            Description = description ?? "",
            VideoUrl = videoUrl,
            DanceId = danceId,
        };
        await repository.AddDancePattern(dancePattern);
        return dancePattern;
    }

    [Error<NotFoundException>]
    [Error<UnauthorizedException>]
    public async Task<DancePattern> UpdateDancePattern(
        [Service] DancePatternRepository repository,
        ClaimsPrincipal claims,
        [ID] int id,
        string name,
        string? description,
        string? videoUrl,
        [ID] int danceId
        )
    {
        if (!claims.IsAdmin())
        {
            throw new UnauthorizedException("User is not authorized to update dance patterns");
        }
        var dancePattern = new DancePattern
        {
            Id = id,
            Name = name,
            Description = description ?? "",
            VideoUrl = videoUrl,
            DanceId = danceId,
        };
        await repository.UpdateDancePattern(dancePattern);
        return dancePattern;
    }

    [Error<NotFoundException>]
    [Error<UnauthorizedException>]
    public async Task<DancePattern> DeleteDancePattern(
        [Service] DancePatternRepository repository,
        ClaimsPrincipal claims,
        [ID] int id)
    {
        if (!claims.IsAdmin())
        {
            throw new UnauthorizedException("User is not authorized to delete dance patterns");
        }
        var dancePattern = await repository.DeleteDancePattern(id);
        if (dancePattern is null)
        {
            throw new NotFoundException("Dance pattern not found");
        }
        return dancePattern;
    }
}
