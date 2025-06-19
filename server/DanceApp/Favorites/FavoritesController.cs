using DanceApp.Extensions;
using DanceApp.Favorites.Models;
using Dataprovider.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace DanceApp.Favorites;

[ApiController]
[Route("[controller]")]
public class FavoritesController(FavoriteService favoriteService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetFavorites()
    {
        var userId = User.TryGetUserId();
        if (userId == null)
        {
            return Ok(new List<FavoriteDto>());
        }
        var favorites = await favoriteService.GetFavorites(userId.Value);
        return Ok(favorites);
    }

    [HttpGet]
    [Route("list-view")]
    public async Task<IActionResult> GetFavoritesListView()
    {
        var userId = User.TryGetUserId();
        if (userId == null)
        {
            return Ok(new List<FavoriteListItemDto>());
        }
        var favorites = await favoriteService.GetFavoritesListView(userId.Value);
        return Ok(favorites);
    }

    [HttpPost]
    public async Task<IActionResult> AddFavorite([FromBody] CreateFavoriteDto favorite)
    {
        var userId = User.GetUserId();
        var createdFavorite = await favoriteService.AddFavorite(favorite.DancePatternId, userId);
        return Ok();
    }

    [HttpDelete]
    [Route("{favoriteId:int}")]
    public async Task<IActionResult> RemoveFavorite(int favoriteId)
    {
        var userId = User.GetUserId();
        try
        {
            await favoriteService.RemoveFavorite(favoriteId, userId);
        }
        catch (NotFoundException) { }
        return NoContent();
    }
}
