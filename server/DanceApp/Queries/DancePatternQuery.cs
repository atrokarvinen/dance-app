using DanceApp.Extensions;
using DanceApp.Outputs;
using DanceApp.Services;
using Dataprovider.Models;
using Dataprovider.Repositories;
using System.Runtime.CompilerServices;
using System.Security.Claims;

namespace DanceApp.Queries;

[ExtendObjectType("Query")]
public class DancePatternQuery
{
    public async Task<IEnumerable<DancePattern>> GetDancePatterns([Service] DancePatternRepository repository)
    {
        var dancePatterns = await repository.GetDancePatterns();
        return dancePatterns;
    }

    public async Task<GetDancePatternOutput> GetDancePattern(
        [Service] DancePatternRepository repository,
        [Service] FavoritesService favoritesService,
        [ID] int id,
        ClaimsPrincipal claims
        )
    {
        var userId = claims.TryGetUserId();
        var isFavorite = await favoritesService.IsFavoritePattern(id, userId);
        var dancePattern = await repository.GetDancePatternById(id);
        return new GetDancePatternOutput()
        {
            DancePattern = dancePattern,
            IsFavorite = isFavorite,
        };
    }
}
