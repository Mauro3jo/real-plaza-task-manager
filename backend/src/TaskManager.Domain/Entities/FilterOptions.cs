namespace TaskManager.Domain.Entities;

public sealed record FilterOptions(
    IReadOnlyList<CatalogOption> Priorities,
    IReadOnlyList<CatalogOption> Statuses);
