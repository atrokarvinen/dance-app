using DanceApp.Exceptions;
using DanceApp.Services;
using Dataprovider.Exceptions;
using Dataprovider.Models;
using Dataprovider.Repositories;

namespace DanceApp.Queries;

[ExtendObjectType("Mutation")]
public class DanceMutation
{
    [Error<BlobException>]
    public async Task<Dance> AddDance(
        [Service] DanceRepository repository,
        [Service] BlobService blobService,
        string name,
        string? imageBase64,
        string? imageUrl
        )
    {
        if (!string.IsNullOrEmpty(imageBase64))
        {
            var blob = await blobService.Upload($"Dance_{name}", imageBase64);
            imageUrl = blob.Url;
        }

        var dance = new Dance
        {
            Name = name,
            ImageUrl = imageUrl,
        };
        repository.AddDance(dance);
        return dance;
    }

    [Error<BlobException>]
    public async Task<Dance> UpdateDance(
        [Service] DanceRepository repository,
        [Service] BlobService blobService,
        [ID] int id,
        string name,
        string? imageBase64,
        string? imageUrl
        )
    {
        var danceToUpdate = repository.GetDanceById(id);
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
            Id = id,
            Name = name,
            ImageUrl = string.IsNullOrEmpty(imageUrl) ? null : imageUrl,
        };
        repository.UpdateDance(dance);
        return dance;
    }

    [Error<NotFoundException>]
    [Error<BlobException>]
    public async Task<Dance> DeleteDance(
        [Service] DanceRepository repository,
        [Service] BlobService blobService,
        [ID] int danceId
        )
    {
        var dance = repository.DeleteDance(danceId);
        if (!string.IsNullOrEmpty(dance?.ImageUrl))
        {
            await blobService.Delete(dance.ImageUrl);
        }
        if (dance is null)
        {
            throw new NotFoundException("Dance not found");
        }
        return dance;
    }
}
