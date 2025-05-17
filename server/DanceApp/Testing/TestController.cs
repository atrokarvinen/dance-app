using DanceApp.Auth;
using DanceApp.Auth.Models;
using DanceApp.Testing.Models;
using Dataprovider;
using Dataprovider.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DanceApp.Testing;

[ApiController]
[Route("[controller]")]
public class TestController(
    DatabaseContext dbContext,
    AuthService authService
    ) : ControllerBase
{
    [HttpPost]
    [Route("auth")]
    public async Task<IActionResult> CreateUser([FromBody] SignupPayload payload, [FromQuery] string? role)
    {
        await authService.Signup(payload, role);
        return Ok();
    }

    [HttpDelete]
    [Route("auth")]
    public async Task<IActionResult> DeleteUser([FromQuery] string username)
    {
        await authService.DeleteUser(username);
        return Ok();
    }

    [HttpPost]
    [Route("dances")]
    public async Task<IActionResult> CreateDance([FromBody] DanceSeedDto dance)
    {
        var dancePatterns = dance.Patterns?.Select(dp => new DancePattern
        {
            Name = dp.Name,
            Description = dp.Description ?? "",
            VideoUrl = dp.VideoUrl,
        }).ToList() ?? [];
        await dbContext.Dances.AddAsync(new Dance
        {
            Name = dance.Name,
            DancePatterns = dancePatterns,
        });
        await dbContext.SaveChangesAsync();
        return Ok();
    }

    [HttpDelete]
    [Route("dances")]
    public async Task<IActionResult> DeleteDance([FromQuery] string name)
    {
        var dance = await dbContext.Dances.Where(d => d.Name.ToLower() == name.ToLower()).ToListAsync();
        if (dance == null) return Ok();
        dbContext.Dances.RemoveRange(dance);
        await dbContext.SaveChangesAsync();
        return Ok();
    }
}
