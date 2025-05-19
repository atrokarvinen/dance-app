using DanceApp.Dances.Models;
using DanceApp.Services;
using Dataprovider.Models;
using Dataprovider.Repositories;

namespace DanceApp.Dances;

public class DanceService(
    ILogger<DanceService> logger,
    DanceRepository danceRepository,
    BlobService blobService
    )
{
    public async Task<List<DanceDto>> GetDances()
    {
        var dances = await danceRepository.GetDances();
        var dtos = dances.Select(d => ToDto(d)).ToList();
        return dtos;
    }

    public async Task<DanceDto> GetDance(int danceId)
    {
        var dance = await danceRepository.GetDanceById(danceId);
        var dto = ToDto(dance);
        return dto;
    }

    public async Task<DanceDto> CreateDance(CreateDanceDto dto)
    {
        var name = dto.Name;
        var imageBase64 = dto.ImageBase64;
        var imageUrl = dto.ImageUrl;

        if (!string.IsNullOrEmpty(imageBase64))
        {
            var blob = await blobService.Upload($"Dance_{name}", imageBase64);
            imageUrl = blob.Url;
        }
        var dance = new Dance()
        {
            Name = name,
            ImageUrl = imageUrl,
        };
        await danceRepository.AddDance(dance);
        var createdDance = await danceRepository.GetDanceById(dance.Id);
        var createdDto = ToDto(createdDance);
        return createdDto;
    }

    public async Task UpdateDance(int danceId, UpdateDanceDto dto)
    {
        var name = dto.Name;
        var imageBase64 = dto.ImageBase64;
        var imageUrl = dto.ImageUrl;

        var danceToUpdate = await danceRepository.GetDanceById(danceId);

        bool imageChanged = !string.IsNullOrEmpty(imageBase64) || imageUrl != danceToUpdate.ImageUrl;
        var previousImageUrl = danceToUpdate.ImageUrl;
        if (imageChanged && !string.IsNullOrEmpty(previousImageUrl))
        {
            await blobService.Delete(previousImageUrl);
        }

        if (!string.IsNullOrEmpty(imageBase64))
        {
            var blob = await blobService.Upload($"Dance_{name}", imageBase64);
            imageUrl = blob.Url;
        }

        var dance = new Dance
        {
            Id = dto.Id,
            Name = name,
            ImageUrl = string.IsNullOrEmpty(imageUrl) ? null : imageUrl,
        };
        await danceRepository.UpdateDance(dance);
    }

    public async Task DeleteDance(int danceId)
    {
        var deleted = await danceRepository.DeleteDance(danceId);
        if (deleted is null) return;
        if (deleted.ImageUrl is null) return;

        try
        {
            await blobService.Delete(deleted.ImageUrl);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to delete blob");
        }
    }

    private DanceDto ToDto(Dance dance)
    {
        return new DanceDto(dance.Id, dance.Name, dance.ImageUrl);
    }

    private Dance ToEntity(DanceDto danceDto)
    {
        return new Dance()
        {
            // Map properties from the DTO to the entity
        };
    }
}
