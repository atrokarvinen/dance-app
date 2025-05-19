using DanceApp.DancePatterns.Models;
using Dataprovider.Models;
using Dataprovider.Repositories;

namespace DanceApp.DancePatterns;

public class DancePatternService(DancePatternRepository dancePatternRepository)
{
    public async Task<List<DancePatternDto>> GetDancePatterns()
    {
        var dancePatterns = await dancePatternRepository.GetDancePatterns();
        var dtos = dancePatterns.Select(d => ToDto(d)).ToList();
        return dtos;
    }
    
    public async Task<List<DancePatternDto>> GetDancePatterns(int danceId)
    {
        var dancePatterns = await dancePatternRepository.GetDancePatterns(danceId);
        var dtos = dancePatterns.Select(d => ToDto(d)).ToList();
        return dtos;
    }

    public async Task<DancePatternDto> GetDancePattern(int dancePatternId)
    {
        var dancePattern = await dancePatternRepository.GetDancePatternById(dancePatternId);
        var dto = ToDto(dancePattern);
        return dto;
    }

    public async Task<DancePatternDto> CreateDancePattern(CreateDancePatternDto dto)
    {
        var name = dto.Name;
        var imageBase64 = dto.ImageBase64;
        var imageUrl = dto.ImageUrl;

        var dancePattern = new DancePattern()
        {
            Name = name,
            ImageUrl = imageUrl,
        };
        await dancePatternRepository.AddDancePattern(dancePattern);
        var createdDancePattern = await dancePatternRepository.GetDancePatternById(dancePattern.Id);
        var createdDto = ToDto(createdDancePattern);
        return createdDto;
    }

    public async Task UpdateDancePattern(int dancePatternId, UpdateDancePatternDto dto)
    {
        var name = dto.Name;
        var imageBase64 = dto.ImageBase64;
        var imageUrl = dto.ImageUrl;

        var dancePatternToUpdate = await dancePatternRepository.GetDancePatternById(dancePatternId);

        var dance = new DancePattern
        {
            Id = dto.Id,
            Name = name,
            ImageUrl = string.IsNullOrEmpty(imageUrl) ? null : imageUrl,
        };
        await dancePatternRepository.UpdateDancePattern(dance);
    }

    public async Task DeleteDancePattern(int dancePatternId)
    {
        await dancePatternRepository.DeleteDancePattern(dancePatternId);
    }

    private DancePatternDto ToDto(DancePattern dancePattern)
    {
        return new DancePatternDto(
            Id: dancePattern.Id,
            Name: dancePattern.Name,
            Description: dancePattern.Description,
            VideoUrl: dancePattern.VideoUrl,
            dancePattern.ImageUrl,
            DanceId: dancePattern.DanceId
            );
    }

    private DancePattern ToEntity(DancePatternDto dancePatternDto)
    {
        return new DancePattern()
        {
            // Map properties from the DTO to the entity
        };
    }
}
