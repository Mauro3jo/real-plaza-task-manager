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

app.MapGet("/api/tasks", () => Results.Ok(SampleTasks.GetAll()))
    .WithName("GetTasks")
    .WithTags("Tasks")
    .Produces<IReadOnlyList<TaskItemDto>>();

app.MapGet("/api/tasks/{id:int}", (int id) =>
    {
        var task = SampleTasks.GetById(id);
        return task is null ? Results.NotFound() : Results.Ok(task);
    })
    .WithName("GetTaskById")
    .WithTags("Tasks")
    .Produces<TaskItemDto>()
    .Produces(StatusCodes.Status404NotFound);

app.Run();
