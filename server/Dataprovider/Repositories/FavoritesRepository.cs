using Dataprovider.Models;

namespace Dataprovider.Repositories;

public class FavoritesRepository(DatabaseContext _context)
{
    public List<FavoritePattern> GetFavoritesByUser(int? userId)
    {
        if (userId == null)
            return new List<FavoritePattern>();

        return _context.FavoritePatterns
            .Where(fp => fp.UserId == userId)
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
