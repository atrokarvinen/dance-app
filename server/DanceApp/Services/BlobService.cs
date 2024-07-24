using DanceApp.Config;
using Microsoft.Extensions.Options;
using System.Text.Json;

namespace DanceApp.Services;

public record BlobPayload(string Name, string FileBase64);
public record BlobResponse(
    string Url,
    string DownloadUrl,
    string Pathname,
    string ContentType,
    string ContentDisposition
    );

public class BlobService(ILogger<BlobService> _logger, IHttpClientFactory _clientFactory, IOptions<BlobConfig> _options)
{
    public async Task<string> Upload(string name, string fileBase64)
    {
        _logger.LogInformation("Uploading blob...");

        string baseUrl = _options.Value.ServiceUrl;
        if (string.IsNullOrEmpty(baseUrl))
        {
            throw new Exception("Blob service URL is not set.");
        }
        _logger.LogInformation("Sending request to: '{url}'", baseUrl);

        string url = new Uri(new Uri(baseUrl), "blobs").ToString();
        var payload = new BlobPayload(name, fileBase64);
        var client = _clientFactory.CreateClient();
        var result = await client.PostAsJsonAsync(url, payload);

        var content = await result.Content.ReadAsStringAsync();
        var jsonOptions = new JsonSerializerOptions() { PropertyNameCaseInsensitive = true, };
        var response = JsonSerializer.Deserialize<BlobResponse>(content, jsonOptions);

        _logger.LogInformation("Blob response: {@response}", response);

        _logger.LogInformation("Blob uploaded successfully.");

        return "Upload";
    }
}
