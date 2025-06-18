using DanceApp.Extensions;
using Dataprovider.Models;
using Dataprovider.Repositories;
using System.Security.Claims;

namespace DanceApp.Queries;

[ExtendObjectType("Query")]
public class FavoritesQuery
{
    public async Task<IEnumerable<FavoritePattern>> GetFavoritePatterns([Service] FavoriteRepository repository, ClaimsPrincipal claims)
    {
        var userId = claims.TryGetUserId();
        if (userId is null) return new List<FavoritePattern>();
        var favorites = await repository.GetFavoritesByUser(userId.Value);
        return favorites;
    }
}
