using TaskManager.Application.DTOs;
using TaskManager.Domain.Entities;

namespace TaskManager.Application.Mappings;

internal static class CatalogMappings
{
    public static CatalogOptionDto ToDto(this CatalogOption option) =>
        new(option.Code, option.Name);

    public static FilterOptionsDto ToDto(this FilterOptions options) =>
        new(
            options.Priorities.Select(option => option.ToDto()).ToList(),
            options.Statuses.Select(option => option.ToDto()).ToList());
}
