using DanceApp.Exceptions;
using DanceApp.Extensions;
using DanceApp.Services;
using Dataprovider.Exceptions;
using Dataprovider.Models;
using Dataprovider.Repositories;
using System.Security.Claims;

namespace DanceApp.Queries;

[ExtendObjectType("Mutation")]
public class DanceMutation
{
    [Error<BlobException>]
    [Error<UnauthorizedException>]
    public async Task<Dance> AddDance(
        [Service] DanceRepository repository,
        [Service] BlobService blobService,
        ClaimsPrincipal claims,
        string name,
        string? imageBase64,
        string? imageUrl
        )
    {
        var isAdmin = claims.IsAdmin();
        if (!isAdmin)
        {
            throw new UnauthorizedException("User is not authorized to add dances");
        }
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
    [Error<UnauthorizedException>]
    public async Task<Dance> UpdateDance(
        [Service] DanceRepository repository,
        [Service] BlobService blobService,
        ClaimsPrincipal claims,
        [ID] int id,
        string name,
        string? imageBase64,
        string? imageUrl
        )
    {
        var isAdmin = claims.IsAdmin();
        if (!isAdmin)
        {
            throw new UnauthorizedException("User is not authorized to update dances");
        }
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
    [Error<UnauthorizedException>]
    public async Task<Dance> DeleteDance(
        [Service] DanceRepository repository,
        [Service] BlobService blobService,
        ClaimsPrincipal claims,
        [ID] int danceId
        )
    {
        var isAdmin = claims.IsAdmin();
        if (!isAdmin)
        {
            throw new UnauthorizedException("User is not authorized to delete dances");
        }
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
