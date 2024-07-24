using DanceApp.Services;
using Dataprovider.Exceptions;
using Dataprovider.Models;
using Dataprovider.Repositories;

namespace DanceApp.Queries;

[ExtendObjectType("Mutation")]
public class DanceMutation
{
    public async Task<Dance> AddDance(
        [Service] DanceRepository repository,
        [Service] BlobService blobService,
        string name, 
        string? imageBase64)
    {
        // TODO upload image to blob storage
        //var blob = await blobService.Upload($"Dance_{name}", imageBase64);
        await Task.CompletedTask;

        var dance = new Dance { Name = name };
        repository.AddDance(dance);
        return dance;
    }

    public Dance UpdateDance([Service] DanceRepository repository, [ID] int id, string name)
    {
        var dance = new Dance { Id = id, Name = name };
        repository.UpdateDance(dance);
        return dance;
    }

    [Error<NotFoundException>]
    public Dance DeleteDance([Service] DanceRepository repository, [ID] int danceId)
    {
        var dance = repository.DeleteDance(danceId);
        if (dance is null)
        {
            throw new NotFoundException("Dance not found");
        }
        return dance;
    }
}
