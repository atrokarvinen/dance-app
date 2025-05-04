using DanceApp.Auth;
using DanceApp.Auth.Models;
using Dataprovider;
using Microsoft.AspNetCore.Mvc;

namespace DanceApp.Controllers;

[ApiController]
[Route("[controller]")]
public class TestController(
    DatabaseContext dbContext,
    AuthService authService
    ) : ControllerBase
{
    [HttpPost]
    [Route("auth")]
    public async Task<IActionResult> CreateUser([FromBody] SignupPayload payload)
    {
        await authService.Signup(payload);
        return Ok();
    }

    [HttpDelete]
    [Route("auth")]
    public async Task<IActionResult> DeleteUser([FromQuery] string username)
    {
        await authService.DeleteUser(username);
        return Ok();
    }
}
