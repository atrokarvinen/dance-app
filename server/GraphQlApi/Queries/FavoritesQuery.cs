using Dataprovider;
using Dataprovider.Models;
using GraphQlApi.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace GraphQlApi.Queries;

[ExtendObjectType("Query")]
public class FavoritesQuery
{
    public IEnumerable<FavoritePattern> GetFavorites([Service] DatabaseContext context, ClaimsPrincipal claims)
    {
        var userId = claims.GetUserId();
        var favorites = context.FavoritePatterns
            .Include(f => f.DancePattern)
            .Where(f => f.UserId == userId);
        return favorites;
    }
}
