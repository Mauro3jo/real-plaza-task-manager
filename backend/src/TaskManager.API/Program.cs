using TaskManager.API.Middleware;
using TaskManager.Application;
using TaskManager.Application.DTOs;
using TaskManager.Application.Interfaces;
using TaskManager.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/health", () => Results.Ok(new { status = "ok" }))
    .WithName("Health")
    .WithTags("Health");

app.MapGet("/api/tasks", async (
        ITaskService taskService,
        string? status,
        string? priority,
        CancellationToken cancellationToken) =>
    {
        var tasks = await taskService.GetTasksAsync(status, priority, cancellationToken);
        return Results.Ok(tasks);
    })
    .WithName("GetTasks")
    .WithTags("Tasks")
    .Produces<IReadOnlyList<TaskListItemDto>>()
    .Produces(StatusCodes.Status400BadRequest);

app.MapGet("/api/tasks/{id:int}", async (
        ITaskService taskService,
        int id,
        CancellationToken cancellationToken) =>
    {
        var task = await taskService.GetByIdAsync(id, cancellationToken);
        return Results.Ok(task);
    })
    .WithName("GetTaskById")
    .WithTags("Tasks")
    .Produces<TaskDetailDto>()
    .Produces(StatusCodes.Status400BadRequest)
    .Produces(StatusCodes.Status404NotFound);

app.MapGet("/api/catalog/filter-options", async (
        ICatalogService catalogService,
        CancellationToken cancellationToken) =>
    {
        var options = await catalogService.GetFilterOptionsAsync(cancellationToken);
        return Results.Ok(options);
    })
    .WithName("GetFilterOptions")
    .WithTags("Catalog")
    .Produces<FilterOptionsDto>();

app.Run();
