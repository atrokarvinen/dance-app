namespace DanceApp.Services.Models;

public record BlobUploadResponse(
    string Url,
    string DownloadUrl,
    string Pathname,
    string ContentType,
    string ContentDisposition,

    string? Error
    );