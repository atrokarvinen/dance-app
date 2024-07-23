using Dataprovider.Exceptions;
using Dataprovider.Models;
using Microsoft.EntityFrameworkCore;

namespace Dataprovider.Repositories;

public class DancePatternRepository(DatabaseContext context)
{
    private readonly DatabaseContext _context = context;

    public List<DancePattern> GetDancePatterns()
    {
        return _context.DancePatterns
            .Include(dp => dp.Dance)
            .ToList();
    }

    public DancePattern GetDancePatternById(int id)
    {
        var dancePattern = FindDancePatternById(id);
        if (dancePattern == null)
            throw new NotFoundException($"Failed to find dance pattern with id ({id})");
        return dancePattern;
    }

    public DancePattern? FindDancePatternById(int id)
    {
        return _context.DancePatterns
            .Include(dp => dp.Dance)
            .AsNoTracking()
            .FirstOrDefault(d => d.Id == id);
    }

    public DancePattern AddDancePattern(DancePattern dancePattern)
    {
        _context.DancePatterns.Add(dancePattern);
        _context.SaveChanges();
        return dancePattern;
    }

    public DancePattern UpdateDancePattern(DancePattern dancePattern)
    {
        var existingDancePattern = FindDancePatternById(dancePattern.Id);
        if (existingDancePattern == null)
            throw new NotFoundException($"Failed to find dance pattern with id ({dancePattern.Id})");
        _context.DancePatterns.Update(dancePattern);
        _context.SaveChanges();
        return dancePattern;
    }

    public DancePattern? DeleteDancePattern(int id)
    {
        var dancePattern = _context.DancePatterns.FirstOrDefault(d => d.Id == id);
        if (dancePattern != null)
        {
            _context.DancePatterns.Remove(dancePattern);
            _context.SaveChanges();
        }
        return dancePattern;
    }
}
