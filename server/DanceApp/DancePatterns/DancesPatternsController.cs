using DanceApp.DancePatterns.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DanceApp.DancePatterns;

[ApiController]
[Route("dance-patterns")]
public class DancesPatternsController(DancePatternService dancePatternService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetDancePatterns()
    {
        var DancePatterns = await dancePatternService.GetDancePatterns();
        return Ok(DancePatterns);
    }

    [HttpGet]
    [Route("dance/{danceId:int}")]
    public async Task<IActionResult> GetDancePatternsForDance(int danceId)
    {
        var DancePatterns = await dancePatternService.GetDancePatterns(danceId);
        return Ok(DancePatterns);
    }

    [HttpGet]
    [Route("{dancePatternId:int}")]
    public async Task<IActionResult> GetDancePattern(int dancePatternId)
    {
        var dance = await dancePatternService.GetDancePattern(dancePatternId);
        if (dance == null)
        {
            return NotFound();
        }
        return Ok(dance);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateDancePattern([FromBody] CreateDancePatternDto dto)
    {
        var createdDance = await dancePatternService.CreateDancePattern(dto);
        return CreatedAtAction(nameof(GetDancePattern), new { dancePatternId = createdDance.Id }, createdDance);
    }

    [HttpPut]
    [Route("{dancePatternId:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateDancePattern(int dancePatternId, [FromBody] UpdateDancePatternDto dto)
    {
        await dancePatternService.UpdateDancePattern(dancePatternId, dto);
        return Ok(dto);
    }

    [HttpDelete]
    [Route("{dancePatternId:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteDancePattern(int dancePatternId)
    {
        await dancePatternService.DeleteDancePattern(dancePatternId);
        return NoContent();
    }
}
