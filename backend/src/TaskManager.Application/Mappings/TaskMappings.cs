using TaskManager.Application.DTOs;
using TaskManager.Domain.Entities;

namespace TaskManager.Application.Mappings;

internal static class TaskMappings
{
    public static TaskItemDto ToDto(this TaskItem task) =>
        new(
            task.Id,
            task.Title,
            task.Description,
            task.PriorityCode,
            task.PriorityName,
            task.StatusCode,
            task.StatusName);
}
