using DanceApp.Auth.Models;
using Microsoft.AspNetCore.Mvc;

namespace DanceApp.Auth;

[ApiController]
[Route("[controller]")]
public class AuthController(AuthService authService) : ControllerBase
{
    [HttpGet]
    [Route("me")]
    public IActionResult WhoAmI()
    {
        var claims = HttpContext.User;
        var user = authService.WhoAmI(claims);
        return Ok(user);
    }

    [HttpPost]
    [Route("signup")]
    public async Task<IActionResult> Signup([FromBody] SignupPayload payload, [FromQuery] string? role)
    {
        var result = await authService.Signup(payload, role);
        return Ok(result);
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginPayload payload)
    {
        var result = await authService.Login(payload);
        return Ok(result);
    }
}
