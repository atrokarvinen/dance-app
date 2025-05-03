using Dataprovider;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DanceApp.Controllers;

[ApiController]
[Route("[controller]")]
public class TestController(DatabaseContext dbContext) : ControllerBase
{
    [HttpPost]
    [Route("auth")]
    public async Task<IActionResult> CreateUser([FromBody] string user)
    {
        await Task.CompletedTask;
        return Ok();
    }

    [HttpDelete]
    [Route("auth")]
    public async Task<IActionResult> DeleteUser([FromQuery] string username)
    {
        await dbContext.Users
            .Where(u => u.Name == username)
            .ExecuteDeleteAsync();
        return Ok();
    }
}
