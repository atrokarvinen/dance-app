using Dataprovider.Exceptions;
using Dataprovider.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Dataprovider.Repositories;

public class DanceRepository(ILogger<DanceRepository> _logger, DatabaseContext _context)
{
    public List<Dance> GetDances()
    {
        _logger.LogInformation("Getting all dances");
        return _context.Dances
            .Include(d => d.DancePatterns)
                .ThenInclude(dp => dp.Variations)
            .AsNoTracking()
            .OrderBy(x => x.Name)
            .ToList();
    }

    public Dance GetDanceById(int id)
    {
        var dance = FindDanceById(id);
        if (dance == null)
            throw new NotFoundException($"Failed to find dance with id ({id})");
        return dance;
    }

    public Dance? FindDanceById(int id)
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
