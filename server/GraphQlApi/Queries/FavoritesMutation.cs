using Dataprovider.Models;
using Dataprovider.Services;
using GraphQlApi.Extensions;
using GraphQlApi.Inputs;
using System.Security.Claims;

namespace GraphQlApi.Queries;

[ExtendObjectType("Mutation")]
public class FavoritesMutation
{
    public FavoritePattern AddFavorite(
        [Service] FavoritesService favoritesService,
        FavoriteAddInput input,
        ClaimsPrincipal claims
        )
    {
        var userId = claims.GetUserId();
        return favoritesService.AddFavorite(input.DancePatternId, userId);
    }

    public FavoritePattern RemoveFavorite(
        [Service] FavoritesService favoritesService,
        FavoriteRemoveInput input,
        ClaimsPrincipal claims
        )
    {
        var id = input.Id;
        var userId = claims.GetUserId();
        var favorite = favoritesService.RemoveFavorite(id, userId);
        return favorite;
    }
}
