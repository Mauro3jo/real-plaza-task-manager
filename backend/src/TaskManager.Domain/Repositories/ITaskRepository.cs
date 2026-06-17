using TaskManager.Domain.Entities;

namespace TaskManager.Domain.Repositories;

public interface ITaskRepository
{
    Task<IReadOnlyList<TaskItem>> GetAllAsync(
        string? status,
        string? priority,
        CancellationToken cancellationToken = default);

    Task<TaskItem?> GetByIdAsync(
        int id,
        CancellationToken cancellationToken = default);
}
