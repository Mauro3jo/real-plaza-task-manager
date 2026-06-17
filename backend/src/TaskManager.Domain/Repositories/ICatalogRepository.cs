using TaskManager.Domain.Entities;

namespace TaskManager.Domain.Repositories;

public interface ICatalogRepository
{
    Task<FilterOptions> GetFilterOptionsAsync(CancellationToken cancellationToken = default);
}
