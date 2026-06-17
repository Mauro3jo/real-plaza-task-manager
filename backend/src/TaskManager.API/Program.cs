using TaskManager.API.Data;
using TaskManager.API.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/health", () => Results.Ok(new { status = "ok" }))
    .WithName("Health")
    .WithTags("Health");

app.MapGet("/api/tasks", (string? status, string? priority) =>
    {
        if (!SampleTasks.IsValidStatus(status))
            return Results.BadRequest(new { message = "Estado inválido." });

        if (!SampleTasks.IsValidPriority(priority))
            return Results.BadRequest(new { message = "Prioridad inválida." });

        return Results.Ok(SampleTasks.GetAll(status, priority));
    })
    .WithName("GetTasks")
    .WithTags("Tasks")
    .Produces<IReadOnlyList<TaskItemDto>>()
    .Produces(StatusCodes.Status400BadRequest);

app.MapGet("/api/tasks/{id:int}", (int id) =>
    {
        var task = SampleTasks.GetById(id);
        return task is null ? Results.NotFound() : Results.Ok(task);
    })
    .WithName("GetTaskById")
    .WithTags("Tasks")
    .Produces<TaskItemDto>()
    .Produces(StatusCodes.Status404NotFound);

app.MapGet("/api/catalog/filter-options", () => Results.Ok(SampleCatalog.GetFilterOptions()))
    .WithName("GetFilterOptions")
    .WithTags("Catalog")
    .Produces<FilterOptionsDto>();

app.Run();
