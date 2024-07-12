using Dataprovider.Models;
using System.Security.Claims;

namespace GraphQlApi.Queries;

[ExtendObjectType("Query")]
public class AuthQuery
{
    public User WhoAmI(ClaimsPrincipal claims)
    {
        var userId = claims.FindFirstValue(ClaimTypes.NameIdentifier);
        var name = claims.FindFirstValue(ClaimTypes.Name);

        int.TryParse(userId, out int parsedId);

        return new User()
        {
            Name = name ?? "N/A",
            UserId = parsedId,
        };
    }
}
