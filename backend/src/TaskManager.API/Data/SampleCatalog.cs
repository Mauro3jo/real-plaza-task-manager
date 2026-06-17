using TaskManager.API.Models;

namespace TaskManager.API.Data;

internal static class SampleCatalog
{
    private static readonly IReadOnlyList<CatalogOptionDto> Priorities =
    [
        new("LOW", "Baja"),
        new("MEDIUM", "Media"),
        new("HIGH", "Alta")
    ];

    private static readonly IReadOnlyList<CatalogOptionDto> Statuses =
    [
        new("PENDING", "Pendiente"),
        new("IN_PROGRESS", "En progreso"),
        new("DONE", "Completada")
    ];

    public static FilterOptionsDto GetFilterOptions() =>
        new(Priorities, Statuses);

    public static bool IsValidStatus(string? status) =>
        string.IsNullOrWhiteSpace(status) ||
        Statuses.Any(option => IsSameCode(option.Code, status));

    public static bool IsValidPriority(string? priority) =>
        string.IsNullOrWhiteSpace(priority) ||
        Priorities.Any(option => IsSameCode(option.Code, priority));

    private static bool IsSameCode(string code, string value) =>
        string.Equals(code, value.Trim(), StringComparison.OrdinalIgnoreCase);
}
