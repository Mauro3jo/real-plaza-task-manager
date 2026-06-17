using TaskManager.Domain.Entities;

namespace TaskManager.Infrastructure.Persistence;

internal sealed class TaskRow
{
    public int TaskId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string PriorityCode { get; set; } = string.Empty;
    public string PriorityName { get; set; } = string.Empty;
    public string StatusCode { get; set; } = string.Empty;
    public string StatusName { get; set; } = string.Empty;

    public TaskItem ToDomain() => new(
        TaskId,
        Title,
        Description ?? string.Empty,
        PriorityCode,
        PriorityName,
        StatusCode,
        StatusName);
}
