using TaskManager.Domain.Entities;
using TaskManager.Domain.Repositories;

namespace TaskManager.API.Data;

internal sealed class SampleCatalog : ICatalogRepository
{
    private static readonly IReadOnlyList<CatalogOption> Priorities =
    [
        new("LOW", "Baja"),
        new("MEDIUM", "Media"),
        new("HIGH", "Alta")
    ];

    private static readonly IReadOnlyList<CatalogOption> Statuses =
    [
        new("PENDING", "Pendiente"),
        new("IN_PROGRESS", "En progreso"),
        new("DONE", "Completada")
    ];

    public Task<FilterOptions> GetFilterOptionsAsync(CancellationToken cancellationToken = default) =>
        Task.FromResult(new FilterOptions(Priorities, Statuses));
}
