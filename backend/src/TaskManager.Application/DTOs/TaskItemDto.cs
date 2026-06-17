namespace TaskManager.Application.DTOs;

public sealed record TaskItemDto(
    int Id,
    string Title,
    string Description,
    string PriorityCode,
    string PriorityName,
    string StatusCode,
    string StatusName);
