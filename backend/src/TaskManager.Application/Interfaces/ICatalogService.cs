using TaskManager.Application.DTOs;

namespace TaskManager.Application.Interfaces;

public interface ICatalogService
{
    Task<FilterOptionsDto> GetFilterOptionsAsync(CancellationToken cancellationToken = default);
}
