using DanceApp.Dances.Models;
using DanceApp.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DanceApp.Dances;

[ApiController]
[Route("[controller]")]
public class DancesController(DanceService danceService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetDances()
    {
        var dances = await danceService.GetDances();
        return Ok(dances);
    }

    [HttpGet]
    [Route("{danceId:int}")]
    public async Task<IActionResult> GetDance(int danceId)
    {
        var dance = await danceService.GetDance(danceId);
        if (dance == null)
        {
            return NotFound();
        }
        return Ok(dance);
    }

    [HttpGet]
    [Route("{danceId:int}/details")]
    public async Task<IActionResult> GetDanceDetails(int danceId)
    {
        var userId = User.TryGetUserId();
        var dance = await danceService.GetDanceDetails(danceId, userId);
        if (dance == null)
        {
            return NotFound();
        }
        return Ok(dance);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateDance([FromBody] CreateDanceDto dance)
    {
        var createdDance = await danceService.CreateDance(dance);
        return CreatedAtAction(nameof(GetDance), new { danceId = createdDance.Id }, createdDance);
    }

    [HttpPut]
    [Route("{danceId:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateDance(int danceId, [FromBody] UpdateDanceDto dance)
    {
        await danceService.UpdateDance(danceId, dance);
        return Ok(dance);
    }

    [HttpDelete]
    [Route("{danceId:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteDance(int danceId)
    {
        await danceService.DeleteDance(danceId);
        return NoContent();
    }
}
