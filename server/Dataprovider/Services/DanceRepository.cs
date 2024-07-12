using Dataprovider.Models;
using Microsoft.EntityFrameworkCore;

namespace Dataprovider.Services;

public class DanceRepository(DatabaseContext context)
{
    private readonly DatabaseContext _context = context;

    public List<Dance> GetDances()
    {
        return _context.Dances
            .Include(d => d.DancePatterns)
                .ThenInclude(dp => dp.Variations)
            .ToList();
    }

    public Dance? GetDanceById(int id)
    {
        return _context.Dances
            .Include(d => d.DancePatterns)
                .ThenInclude(dp => dp.Variations)
            .FirstOrDefault(d => d.DanceId == id);
    }

    public Dance AddDance(Dance dance)
    {
        _context.Dances.Add(dance);
        _context.SaveChanges();
        return dance;
    }

    public Dance UpdateDance(Dance dance)
    {
        _context.Dances.Update(dance);
        _context.SaveChanges();
        return dance;
    }

    public Dance? DeleteDance(int id)
    {
        var dance = _context.Dances.FirstOrDefault(d => d.DanceId == id);
        if (dance != null)
        {
            _context.Dances.Remove(dance);
            _context.SaveChanges();
        }
        return dance;
    }
}
