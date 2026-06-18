using TaskManager.Application.DTOs;

namespace TaskManager.Application.Interfaces;

public interface ITaskService
{
    Task<IReadOnlyList<TaskListItemDto>> GetTasksAsync(
        string? status,
        string? priority,
        CancellationToken cancellationToken = default);

    Task<TaskDetailDto> GetByIdAsync(
        int id,
        CancellationToken cancellationToken = default);
}
