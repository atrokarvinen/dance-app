using DanceApp.Exceptions;
using Dataprovider.Models;
using Dataprovider.Repositories;

namespace Dataprovider.Services;

public class FavoritesService(
    FavoritesRepository _favoritesRepository,
    DancePatternRepository _dancePatternRepository
    )
{
    public bool? IsFavoritePattern(int dancePatternId, int? userId)
    {
        if (userId is null)
        {
            return null;
        }
        var favorites = _favoritesRepository.GetFavoritesByUser(userId.Value);
        var dancePattern = _dancePatternRepository.GetDancePatternById(dancePatternId);
        var isFavorite = favorites.Any(fp => fp.DancePatternId == dancePatternId);
        return isFavorite;
    }

    public FavoritePattern AddFavorite(int dancePatternId, int userId)
    {
        var favorites = _favoritesRepository.GetFavoritesByUser(userId);
        var isAlreadyFavorite = favorites.Any(fp => fp.DancePatternId == dancePatternId);
        if (isAlreadyFavorite)
            throw new FavoritePatternException("Pattern is already a favorite");

        var favorite = new FavoritePattern
        {
            DancePatternId = dancePatternId,
            UserId = userId
        };

        _favoritesRepository.AddFavorite(favorite);

        return favorite;
    }

    public FavoritePattern RemoveFavorite(int id, int userId)
    {
        var favorite = _favoritesRepository.RemoveFavorite(id, userId);
        return favorite;
    }
}
