using Dataprovider.Models;
using Microsoft.EntityFrameworkCore;

namespace Dataprovider.Repositories;

public class FavoritesRepository(DatabaseContext _context)
{
    public List<FavoritePattern> GetFavoritesByUser(int? userId)
    {
        if (userId == null)
            return new List<FavoritePattern>();

        return _context.FavoritePatterns
            .Include(fp => fp.DancePattern)
                .ThenInclude(dp => dp.Dance)
            .Where(fp => fp.UserId == userId)
            .OrderBy(x => x.DancePattern.Dance.Name)
                .ThenBy(x => x.DancePattern.Name)
            .ToList();
    }

    public FavoritePattern AddFavorite(FavoritePattern favorite)
    {
        _context.FavoritePatterns.Add(favorite);
        _context.SaveChanges();

        return favorite;
    }

    public FavoritePattern RemoveFavorite(int id, int userId)
    {
        var favorite = _context.FavoritePatterns.FirstOrDefault(f => f.FavoritePatternId == id);
        if (favorite is null)
        {
            throw new Exception("Favorite not found");
        }
        if (favorite.UserId != userId)
        {
            throw new Exception("Unauthorized");
        }
        _context.FavoritePatterns.Remove(favorite);
        _context.SaveChanges();
        return favorite;
    }
}
