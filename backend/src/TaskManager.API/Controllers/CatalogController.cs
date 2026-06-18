using Microsoft.AspNetCore.Mvc;
using TaskManager.Application.DTOs;
using TaskManager.Application.Interfaces;

namespace TaskManager.API.Controllers;

[ApiController]
[Route("api/catalog")]
[Produces("application/json")]
public sealed class CatalogController : ControllerBase
{
    private readonly ICatalogService _catalogService;

    public CatalogController(ICatalogService catalogService)
    {
        _catalogService = catalogService;
    }

    [HttpGet("filter-options")]
    [ProducesResponseType(typeof(FilterOptionsDto), StatusCodes.Status200OK)]
    public async Task<ActionResult<FilterOptionsDto>> GetFilterOptions(
        CancellationToken cancellationToken)
    {
        var options = await _catalogService.GetFilterOptionsAsync(cancellationToken);
        return Ok(options);
    }
}
