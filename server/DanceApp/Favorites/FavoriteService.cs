using DanceApp.Exceptions;
using DanceApp.Favorites.Models;
using Dataprovider.Models;
using Dataprovider.Repositories;

namespace DanceApp.Favorites;

public class FavoriteService(FavoriteRepository favoriteRepository)
{
    public async Task<List<FavoriteDto>> GetFavorites(int userId)
    {
        var favorites = await favoriteRepository.GetFavoritesByUser(userId);
        var dtos = favorites.Select(d => ToDto(d)).ToList();
        return dtos;
    }

    public async Task<List<FavoriteListItemDto>> GetFavoritesListView(int userId)
    {
        var favorites = await favoriteRepository.GetFavoritesListView(userId);
        var dtos = favorites.Select(x => new FavoriteListItemDto()
        {
            Id = x.Id,
            DancePattern = new FavoriteListItemPatternDto
            {
                Id = x.DancePattern.Id,
                Name = x.DancePattern.Name,
                Dance = new FavoriteListItemDanceDto
                {
                    Id = x.DancePattern.Dance.Id,
                    Name = x.DancePattern.Dance.Name,
                },
            },
        }).ToList();
        return dtos;
    }

    public async Task<FavoritePattern> AddFavorite(int dancePatternId, int userId)
    {
        var favorites = await favoriteRepository.GetFavoritesByUser(userId);
        var isAlreadyFavorite = favorites.Any(fp => fp.DancePatternId == dancePatternId);
        if (isAlreadyFavorite)
            throw new FavoritePatternException("Pattern is already a favorite");

        var favorite = new FavoritePattern
        {
            DancePatternId = dancePatternId,
            UserId = userId
        };

        await favoriteRepository.AddFavorite(favorite);

        return favorite;
    }

    public async Task<FavoritePattern> RemoveFavorite(int id, int userId)
    {
        var favorite = await favoriteRepository.RemoveFavorite(id, userId);
        return favorite;
    }

    private FavoriteDto ToDto(FavoritePattern favorite)
    {
        return new FavoriteDto(favorite.Id, favorite.DancePatternId);
    }

    private FavoritePattern ToEntity(FavoriteDto favoriteDto)
    {
        return new FavoritePattern()
        {
            // Map properties from the DTO to the entity
        };
    }


}
