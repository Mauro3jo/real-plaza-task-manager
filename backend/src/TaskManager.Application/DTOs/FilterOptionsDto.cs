namespace TaskManager.Application.DTOs;

public sealed record FilterOptionsDto(
    IReadOnlyList<CatalogOptionDto> Priorities,
    IReadOnlyList<CatalogOptionDto> Statuses);
