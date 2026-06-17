using System.Data;
using Dapper;
using TaskManager.Domain.Entities;
using TaskManager.Domain.Repositories;
using TaskManager.Infrastructure.Persistence;

namespace TaskManager.Infrastructure.Repositories;

public sealed class CatalogRepository : ICatalogRepository
{
    private const string PriorityCatalog = "priority";
    private const string StatusCatalog = "status";

    private readonly ISqlConnectionFactory _connectionFactory;

    public CatalogRepository(ISqlConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<FilterOptions> GetFilterOptionsAsync(
        CancellationToken cancellationToken = default)
    {
        using var connection = _connectionFactory.CreateConnection();

        var command = new CommandDefinition(
            commandText: "tasks.usp_FilterOptions_Get",
            commandType: CommandType.StoredProcedure,
            cancellationToken: cancellationToken);

        var rows = await connection.QueryAsync<CatalogOptionRow>(command);
        var orderedRows = rows.OrderBy(row => row.SortOrder).ToList();

        return new FilterOptions(
            GetByType(orderedRows, PriorityCatalog),
            GetByType(orderedRows, StatusCatalog));
    }

    private static IReadOnlyList<CatalogOption> GetByType(
        IEnumerable<CatalogOptionRow> rows,
        string type) =>
        rows
            .Where(row => string.Equals(row.CatalogType, type, StringComparison.OrdinalIgnoreCase))
            .Select(row => row.ToDomain())
            .ToList();
}
