using DanceApp.Extensions;
using DanceApp.Outputs;
using Dataprovider.Models;
using Dataprovider.Repositories;
using Dataprovider.Services;
using System.Security.Claims;

namespace DanceApp.Queries;

[ExtendObjectType("Query")]
public class DancePatternQuery
{
    public IEnumerable<DancePattern> GetDancePatterns([Service] DancePatternRepository repository)
    {
        var dancePatterns = repository.GetDancePatterns();
        return dancePatterns;
    }

    public GetDancePatternOutput GetDancePattern(
        [Service] DancePatternRepository repository,
        [Service] FavoritesService favoritesService,
        [ID] int id,
        ClaimsPrincipal claims
        )
    {
        var userId = claims.TryGetUserId();
        var isFavorite = favoritesService.IsFavoritePattern(id, userId);
        var dancePattern = repository.GetDancePatternById(id);
        return new GetDancePatternOutput()
        {
            DancePattern = dancePattern,
            IsFavorite = isFavorite,
        };
    }
}
