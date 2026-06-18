using TaskManager.Application.Common;
using TaskManager.Application.DTOs;
using TaskManager.Application.Interfaces;
using TaskManager.Application.Mappings;
using TaskManager.Domain.Entities;
using TaskManager.Domain.Repositories;

namespace TaskManager.Application.Services;

public sealed class TaskService : ITaskService
{
    private readonly ITaskRepository _taskRepository;
    private readonly ICatalogRepository _catalogRepository;

    public TaskService(
        ITaskRepository taskRepository,
        ICatalogRepository catalogRepository)
    {
        _taskRepository = taskRepository;
        _catalogRepository = catalogRepository;
    }

    public async Task<IReadOnlyList<TaskListItemDto>> GetTasksAsync(
        string? status,
        string? priority,
        CancellationToken cancellationToken = default)
    {
        var options = await _catalogRepository.GetFilterOptionsAsync(cancellationToken);

        if (!IsValid(status, options.Statuses))
            throw new ValidationException("Estado inválido.");

        if (!IsValid(priority, options.Priorities))
            throw new ValidationException("Prioridad inválida.");

        var tasks = await _taskRepository.GetAllAsync(status, priority, cancellationToken);
        return tasks.Select(task => task.ToListItemDto()).ToList();
    }

    public async Task<TaskDetailDto> GetByIdAsync(
        int id,
        CancellationToken cancellationToken = default)
    {
        if (id <= 0)
            throw new ValidationException("El id de la tarea debe ser mayor a cero.");

        var task = await _taskRepository.GetByIdAsync(id, cancellationToken)
            ?? throw NotFoundException.ForTask(id);

        return task.ToDetailDto();
    }

    private static bool IsValid(string? code, IReadOnlyList<CatalogOption> options) =>
        string.IsNullOrWhiteSpace(code) ||
        options.Any(option => string.Equals(
            option.Code,
            code.Trim(),
            StringComparison.OrdinalIgnoreCase));
}
