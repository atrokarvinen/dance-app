using DanceApp.Config;
using DanceApp.Exceptions;
using DanceApp.Services.Models;
using Microsoft.Extensions.Options;
using System.Net;
using System.Text.Json;

namespace DanceApp.Services;

public class BlobService(ILogger<BlobService> _logger, IHttpClientFactory _clientFactory, IOptions<BlobConfig> _options)
{
    public async Task<BlobUploadResponse> Upload(string name, string fileBase64)
    {
        _logger.LogInformation("Uploading blob...");

        try
        {
            string baseUrl = _options.Value.ServiceUrl;
            if (string.IsNullOrEmpty(baseUrl))
            {
                throw new Exception("Blob service URL is not set.");
            }
            _logger.LogInformation("Sending request to: '{url}'", baseUrl);

            string url = new Uri(new Uri(baseUrl), "blobs").ToString();
            var request = new BlobUploadRequest(
                Name: name,
                FileBase64: fileBase64
            );
            var client = _clientFactory.CreateClient();
            var result = await client.PostAsJsonAsync(url, request);

            if (result.StatusCode == HttpStatusCode.NotFound)
            {
                throw new Exception($"Invalid endpoint '{url}' not found");
            }

            var content = await result.Content.ReadAsStringAsync();
            var jsonOptions = new JsonSerializerOptions() { PropertyNameCaseInsensitive = true, };
            var response = JsonSerializer.Deserialize<BlobUploadResponse>(content, jsonOptions);

            _logger.LogInformation("Blob response: {@response}", response);

            if (response is null)
            {
                throw new BlobException("Failed to upload blob: response is null");
            }
            if (!string.IsNullOrEmpty(response.Error))
            {
                throw new BlobException($"Failed to delete blob: {response.Error}");
            }
            if (string.IsNullOrEmpty(response.Url))
            {
                throw new BlobException("Failed to upload blob: Return blob URL is null or empty");
            }

            _logger.LogInformation("Blob uploaded successfully.");

            return response;
        }
        catch (BlobException)
        {
            throw;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading blob.");
            throw new BlobException("Failed to upload blob");
        }
    }

    public async Task Delete(string blobUrl)
    {
        _logger.LogInformation("Deleting blob...");

        try
        {
            string baseUrl = _options.Value.ServiceUrl;
            if (string.IsNullOrEmpty(baseUrl))
            {
                throw new Exception("Blob service URL is not set.");
            }
            _logger.LogInformation("Sending request to: '{url}'", baseUrl);

            string url = new Uri(new Uri(baseUrl), "blobs/delete").ToString();
            var request = new BlobDeleteRequest(blobUrl);
            var client = _clientFactory.CreateClient();
            var result = await client.PostAsJsonAsync(url, request);

            var content = await result.Content.ReadAsStringAsync();
            var jsonOptions = new JsonSerializerOptions() { PropertyNameCaseInsensitive = true, };
            var response = JsonSerializer.Deserialize<BlobDeleteResponse>(content, jsonOptions);

            _logger.LogInformation("Blob response: {@response}", response);

            if (response is null)
            {
                throw new BlobException("Failed to delete blob: response is null");
            }
            if (!string.IsNullOrEmpty(response.Error))
            {
                throw new BlobException($"Failed to delete blob: {response.Error}");
            }

            _logger.LogInformation("Blob deleted successfully.");
        }
        catch (BlobException)
        {
            throw;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting blob.");
            throw new BlobException("Failed to delete blob");
        }
    }
}
