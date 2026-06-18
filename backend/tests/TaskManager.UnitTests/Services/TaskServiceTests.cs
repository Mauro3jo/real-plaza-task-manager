using TaskManager.Application.Common;
using TaskManager.Application.Services;
using TaskManager.Domain.Entities;
using TaskManager.Domain.Repositories;
using Xunit;

namespace TaskManager.UnitTests.Services;

public sealed class TaskServiceTests
{
    [Fact]
    public async Task GetTasksAsync_returns_tasks_for_valid_filters()
    {
        var repository = new FakeTaskRepository();
        var service = new TaskService(repository, new FakeCatalogRepository());

        var result = await service.GetTasksAsync("DONE", "HIGH");

        Assert.Equal(2, result.Count);
        Assert.All(result, task => Assert.Equal("DONE", task.StatusCode));
        Assert.All(result, task => Assert.Equal("HIGH", task.PriorityCode));
    }

    [Fact]
    public async Task GetTasksAsync_rejects_invalid_status()
    {
        var service = new TaskService(new FakeTaskRepository(), new FakeCatalogRepository());

        await Assert.ThrowsAsync<ValidationException>(() =>
            service.GetTasksAsync("INVALID", null));
    }

    [Fact]
    public async Task GetByIdAsync_rejects_missing_task()
    {
        var service = new TaskService(new FakeTaskRepository(), new FakeCatalogRepository());

        var exception = await Assert.ThrowsAsync<NotFoundException>(() =>
            service.GetByIdAsync(999));

        Assert.Contains("999", exception.Message);
    }

    private sealed class FakeTaskRepository : ITaskRepository
    {
        private static readonly IReadOnlyList<TaskItem> Items =
        [
            new(1, "Configurar entorno", "Preparar herramientas.", "HIGH", "Alta", "DONE", "Completada"),
            new(2, "Diseñar base", "Crear tablas.", "HIGH", "Alta", "DONE", "Completada"),
            new(3, "Armar filtros", "Filtrar la lista.", "MEDIUM", "Media", "PENDING", "Pendiente")
        ];

        public Task<IReadOnlyList<TaskItem>> GetAllAsync(
            string? status,
            string? priority,
            CancellationToken cancellationToken = default)
        {
            var query = Items.AsEnumerable();

            if (!string.IsNullOrWhiteSpace(status))
                query = query.Where(task => string.Equals(task.StatusCode, status, StringComparison.OrdinalIgnoreCase));

            if (!string.IsNullOrWhiteSpace(priority))
                query = query.Where(task => string.Equals(task.PriorityCode, priority, StringComparison.OrdinalIgnoreCase));

            return Task.FromResult<IReadOnlyList<TaskItem>>(query.ToList());
        }

        public Task<TaskItem?> GetByIdAsync(
            int id,
            CancellationToken cancellationToken = default) =>
            Task.FromResult(Items.FirstOrDefault(task => task.Id == id));
    }

    private sealed class FakeCatalogRepository : ICatalogRepository
    {
        public Task<FilterOptions> GetFilterOptionsAsync(CancellationToken cancellationToken = default) =>
            Task.FromResult(new FilterOptions(
                [
                    new("LOW", "Baja"),
                    new("MEDIUM", "Media"),
                    new("HIGH", "Alta")
                ],
                [
                    new("PENDING", "Pendiente"),
                    new("IN_PROGRESS", "En progreso"),
                    new("DONE", "Completada")
                ]));
    }
}
