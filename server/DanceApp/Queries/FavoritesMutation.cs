using DanceApp.Exceptions;
using DanceApp.Extensions;
using Dataprovider.Exceptions;
using Dataprovider.Models;
using Dataprovider.Services;
using System.Security.Claims;

namespace DanceApp.Queries;

[ExtendObjectType("Mutation")]
public class FavoritesMutation
{
    [Error<FavoritePatternException>]
    public FavoritePattern AddFavorite(
        [Service] FavoritesService favoritesService,
        [ID] int dancePatternId,
        ClaimsPrincipal claims
        )
    {
        var userId = claims.GetUserId();
        return favoritesService.AddFavorite(dancePatternId, userId);
    }

    [Error<NotFoundException>]
    [Error<UnauthorizedException>]
    [Error<FavoritePatternException>]
    public FavoritePattern RemoveFavorite(
        [Service] FavoritesService favoritesService,
        [ID] int id,
        ClaimsPrincipal claims
        )
    {
        var userId = claims.GetUserId();
        var favorite = favoritesService.RemoveFavorite(id, userId);
        return favorite;
    }
}
