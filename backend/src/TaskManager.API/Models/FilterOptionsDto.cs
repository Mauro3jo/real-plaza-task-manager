namespace TaskManager.API.Models;

public sealed record FilterOptionsDto(
    IReadOnlyList<CatalogOptionDto> Priorities,
    IReadOnlyList<CatalogOptionDto> Statuses);
