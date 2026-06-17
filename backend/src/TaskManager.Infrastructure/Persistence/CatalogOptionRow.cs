using TaskManager.Domain.Entities;

namespace TaskManager.Infrastructure.Persistence;

internal sealed class CatalogOptionRow
{
    public string CatalogType { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int SortOrder { get; set; }

    public CatalogOption ToDomain() => new(Code, Name);
}
