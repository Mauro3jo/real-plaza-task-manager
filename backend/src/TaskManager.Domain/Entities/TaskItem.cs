namespace TaskManager.Domain.Entities;

public sealed record TaskItem(
    int Id,
    string Title,
    string Description,
    string PriorityCode,
    string PriorityName,
    string StatusCode,
    string StatusName);
