using System.Data;
using Dapper;
using TaskManager.Domain.Entities;
using TaskManager.Domain.Repositories;
using TaskManager.Infrastructure.Persistence;

namespace TaskManager.Infrastructure.Repositories;

public sealed class TaskRepository : ITaskRepository
{
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
        parameters.Add("@StatusCode", Normalize(status), DbType.String);
        parameters.Add("@PriorityCode", Normalize(priority), DbType.String);

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

    private static string? Normalize(string? code) =>
        string.IsNullOrWhiteSpace(code) ? null : code.Trim().ToUpperInvariant();
}
