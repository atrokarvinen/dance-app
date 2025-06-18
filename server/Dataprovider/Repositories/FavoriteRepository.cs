using Dataprovider.Exceptions;
using Dataprovider.Models;
using Microsoft.EntityFrameworkCore;

namespace Dataprovider.Repositories;

public class FavoriteRepository(DatabaseContext _context)
{
    public Task<List<FavoritePattern>> GetFavoritesByUser(int userId)
    {
        return _context.FavoritePatterns
            .Where(fp => fp.UserId == userId)
            .ToListAsync();
    }

    public Task<List<FavoritePattern>> GetFavoritesListView(int userId)
    {
        return _context.FavoritePatterns
            .Include(fp => fp.DancePattern)
                .ThenInclude(dp => dp.Dance)
            .Where(fp => fp.UserId == userId)
            .OrderBy(x => x.DancePattern.Dance.Name)
                .ThenBy(x => x.DancePattern.Name)
            .ToListAsync();
    }

    public async Task<FavoritePattern> AddFavorite(FavoritePattern favorite)
    {
        await _context.FavoritePatterns.AddAsync(favorite);
        await _context.SaveChangesAsync();

        return favorite;
    }

    public async Task<FavoritePattern> RemoveFavorite(int id, int userId)
    {
        var favorite = await _context.FavoritePatterns.FirstOrDefaultAsync(f => f.Id == id);
        if (favorite is null)
        {
            throw new NotFoundException("Favorite not found");
        }
        if (favorite.UserId != userId)
        {
            throw new UnauthorizedException("Unauthorized");
        }
        _context.FavoritePatterns.Remove(favorite);
        await _context.SaveChangesAsync();
        return favorite;
    }
}
