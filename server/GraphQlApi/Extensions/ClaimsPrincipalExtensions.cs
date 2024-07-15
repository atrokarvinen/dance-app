using System.Security.Claims;

namespace GraphQlApi.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static int GetUserId(this ClaimsPrincipal claimsPrincipal)
    {
        var userIdStr = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdStr is null)
        {
            throw new Exception("User not authenticated");
        }
        if (!int.TryParse(userIdStr, out int userId))
        {
            throw new ArgumentException($"User id '{userIdStr}' could not be parsed to int.");
        }

        return userId;
    }

    public static int? TryGetUserId(this ClaimsPrincipal claimsPrincipal)
    {
        var userIdStr = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdStr is null)
        {
            return null;
        }
        return GetUserId(claimsPrincipal);
    }
}
