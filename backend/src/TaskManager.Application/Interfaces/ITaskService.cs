using TaskManager.Application.DTOs;

namespace TaskManager.Application.Interfaces;

public interface ITaskService
{
    Task<IReadOnlyList<TaskItemDto>> GetTasksAsync(
        string? status,
        string? priority,
        CancellationToken cancellationToken = default);

    Task<TaskItemDto?> GetByIdAsync(
        int id,
        CancellationToken cancellationToken = default);
}
