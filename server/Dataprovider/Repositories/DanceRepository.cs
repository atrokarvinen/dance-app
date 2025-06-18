using Dataprovider.Exceptions;
using Dataprovider.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Dataprovider.Repositories;

public class DanceRepository(ILogger<DanceRepository> _logger, DatabaseContext _context)
{
    public Task<List<Dance>> GetDances()
    {
        _logger.LogInformation("Getting all dances");
        return _context.Dances
            .Include(d => d.DancePatterns)
                .ThenInclude(dp => dp.Variations)
            .AsNoTracking()
            .OrderBy(x => x.Name)
            .ToListAsync();
    }

    public async Task<Dance> GetDanceById(int id)
    {
        var dance = await FindDanceById(id);
        if (dance == null)
            throw new NotFoundException($"Failed to find dance with id ({id})");
        return dance;
    }

    public Task<Dance> GetDanceDetailsById(int danceId)
    {
        var dance = _context.Dances
            .Include(d => d.DancePatterns)
            .AsNoTracking()
            .FirstOrDefaultAsync(d => d.Id == danceId);
        if (dance == null)
            throw new NotFoundException($"Failed to find dance with id ({danceId})");
        return dance!;
    }

    public Task<Dance?> FindDanceById(int id)
    {
        return _context.Dances
            .Include(d => d.DancePatterns)
                .ThenInclude(dp => dp.Variations)
            .AsNoTracking()
            .FirstOrDefaultAsync(d => d.Id == id);
    }

    public async Task<Dance> AddDance(Dance dance)
    {
        await _context.Dances.AddAsync(dance);
        await _context.SaveChangesAsync();
        return dance;
    }

    public async Task<Dance> UpdateDance(Dance dance)
    {
        _context.Dances.Update(dance);
        await _context.SaveChangesAsync();
        return dance;
    }

    public async Task<Dance?> DeleteDance(int id)
    {
        var dance = await _context.Dances.FirstOrDefaultAsync(d => d.Id == id);
        if (dance != null)
        {
            _context.Dances.Remove(dance);
            await _context.SaveChangesAsync();
        }
        return dance;
    }

    
}
