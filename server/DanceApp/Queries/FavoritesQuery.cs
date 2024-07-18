using DanceApp.Extensions;
using Dataprovider.Models;
using Dataprovider.Repositories;
using System.Security.Claims;

namespace DanceApp.Queries;

[ExtendObjectType("Query")]
public class FavoritesQuery
{
    public IEnumerable<FavoritePattern> GetFavorites([Service] FavoritesRepository repository, ClaimsPrincipal claims)
    {
        var userId = claims.TryGetUserId();
        if (userId is null) return new List<FavoritePattern>();
        var favorites = repository.GetFavoritesByUser(userId);
        return favorites;
    }
}
