using DanceApp.Exceptions;
using Dataprovider.Models;
using Dataprovider.Repositories;

namespace DanceApp.Services;

public class FavoritesService(FavoriteRepository _favoritesRepository)
{
    public async Task<bool?> IsFavoritePattern(int dancePatternId, int? userId)
    {
        if (userId is null)
        {
            return null;
        }
        var favorites = await _favoritesRepository.GetFavoritesByUser(userId.Value);
        var isFavorite = favorites.Any(fp => fp.DancePatternId == dancePatternId);
        return isFavorite;
    }

    public async Task<FavoritePattern> AddFavorite(int dancePatternId, int userId)
    {
        var favorites = await _favoritesRepository.GetFavoritesByUser(userId);
        var isAlreadyFavorite = favorites.Any(fp => fp.DancePatternId == dancePatternId);
        if (isAlreadyFavorite)
            throw new FavoritePatternException("Pattern is already a favorite");

        var favorite = new FavoritePattern
        {
            DancePatternId = dancePatternId,
            UserId = userId
        };

        await _favoritesRepository.AddFavorite(favorite);

        return favorite;
    }

    public async Task<FavoritePattern> RemoveFavorite(int id, int userId)
    {
        var favorite = await _favoritesRepository.RemoveFavorite(id, userId);
        return favorite;
    }
}
