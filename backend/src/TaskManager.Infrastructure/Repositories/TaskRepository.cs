using System.Data;
using Dapper;
using TaskManager.Domain.Entities;
using TaskManager.Domain.Repositories;
using TaskManager.Infrastructure.Persistence;

namespace TaskManager.Infrastructure.Repositories;

public sealed class TaskRepository : ITaskRepository
{
    private static readonly IReadOnlyDictionary<string, byte> StatusIds =
        new Dictionary<string, byte>(StringComparer.OrdinalIgnoreCase)
        {
            ["PENDING"] = 1,
            ["IN_PROGRESS"] = 2,
            ["DONE"] = 3
        };

    private static readonly IReadOnlyDictionary<string, byte> PriorityIds =
        new Dictionary<string, byte>(StringComparer.OrdinalIgnoreCase)
        {
            ["LOW"] = 1,
            ["MEDIUM"] = 2,
            ["HIGH"] = 3
        };

    private readonly ISqlConnectionFactory _connectionFactory;

    public TaskRepository(ISqlConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<IReadOnlyList<TaskItem>> GetAllAsync(
        string? status,
        string? priority,
        CancellationToken cancellationToken = default)
    {
        var parameters = new DynamicParameters();
        parameters.Add("@StatusId", TryGetId(StatusIds, status), DbType.Byte);
        parameters.Add("@PriorityId", TryGetId(PriorityIds, priority), DbType.Byte);

        using var connection = _connectionFactory.CreateConnection();

        var command = new CommandDefinition(
            commandText: "tasks.usp_Tasks_GetList",
            parameters: parameters,
            commandType: CommandType.StoredProcedure,
            cancellationToken: cancellationToken);

        var rows = await connection.QueryAsync<TaskRow>(command);
        return rows.Select(row => row.ToDomain()).ToList();
    }

    public async Task<TaskItem?> GetByIdAsync(
        int id,
        CancellationToken cancellationToken = default)
    {
        var parameters = new DynamicParameters();
        parameters.Add("@TaskId", id, DbType.Int32);

        using var connection = _connectionFactory.CreateConnection();

        var command = new CommandDefinition(
            commandText: "tasks.usp_Tasks_GetById",
            parameters: parameters,
            commandType: CommandType.StoredProcedure,
            cancellationToken: cancellationToken);

        var row = await connection.QuerySingleOrDefaultAsync<TaskRow>(command);
        return row?.ToDomain();
    }

    private static byte? TryGetId(IReadOnlyDictionary<string, byte> ids, string? code) =>
        string.IsNullOrWhiteSpace(code) ? null : ids[code.Trim()];
}
