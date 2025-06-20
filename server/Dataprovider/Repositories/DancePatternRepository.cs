using Dataprovider.Exceptions;
using Dataprovider.Models;
using Microsoft.EntityFrameworkCore;

namespace Dataprovider.Repositories;

public class DancePatternRepository(DatabaseContext context)
{
    private readonly DatabaseContext _context = context;

    public Task<List<DancePattern>> GetDancePatterns()
    {
        return _context.DancePatterns
            .Include(dp => dp.Dance)
            .AsNoTracking()
            .ToListAsync();
    }

    public Task<List<DancePattern>> GetDancePatterns(int danceId)
    {
        return _context.DancePatterns
            .Where(dp => dp.DanceId == danceId)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<DancePattern> GetDancePatternById(int id)
    {
        var dancePattern = await FindDancePatternById(id);
        if (dancePattern == null)
            throw new NotFoundException($"Failed to find dance pattern with id ({id})");
        return dancePattern;
    }

    public async Task<DancePattern> GetDancePatternDetails(int dancePatternId)
    {
        var dancePattern = await _context.DancePatterns
            .AsNoTracking()
            .FirstOrDefaultAsync(dp => dp.Id == dancePatternId);
        if (dancePattern == null)
            throw new NotFoundException($"Failed to find dance pattern with id ({dancePatternId})");
        return dancePattern;
    }

    public Task<DancePattern?> FindDancePatternById(int id)
    {
        return _context.DancePatterns
            .Include(dp => dp.Dance)
            .AsNoTracking()
            .FirstOrDefaultAsync(d => d.Id == id);
    }

    public async Task<DancePattern> AddDancePattern(DancePattern dancePattern)
    {
        await _context.DancePatterns.AddAsync(dancePattern);
        await _context.SaveChangesAsync();
        return dancePattern;
    }

    public async Task<DancePattern> UpdateDancePattern(DancePattern dancePattern)
    {
        var existingDancePattern = await FindDancePatternById(dancePattern.Id);
        if (existingDancePattern == null)
            throw new NotFoundException($"Failed to find dance pattern with id ({dancePattern.Id})");
        _context.DancePatterns.Update(dancePattern);
        await _context.SaveChangesAsync();
        return dancePattern;
    }

    public async Task<DancePattern?> DeleteDancePattern(int id)
    {
        var dancePattern = await _context.DancePatterns.FirstOrDefaultAsync(d => d.Id == id);
        if (dancePattern != null)
        {
            _context.DancePatterns.Remove(dancePattern);
            await _context.SaveChangesAsync();
        }
        return dancePattern;
    }

    
}
