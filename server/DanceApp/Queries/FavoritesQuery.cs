using DanceApp.Extensions;
using Dataprovider;
using Dataprovider.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace DanceApp.Queries;

[ExtendObjectType("Query")]
public class FavoritesQuery
{
    public IEnumerable<FavoritePattern> GetFavorites([Service] DatabaseContext context, ClaimsPrincipal claims)
    {
        var userId = claims.TryGetUserId();
        if (userId is null) return new List<FavoritePattern>();
        var favorites = context.FavoritePatterns
            .Include(f => f.DancePattern)
            .Where(f => f.UserId == userId);
        return favorites;
    }
}
