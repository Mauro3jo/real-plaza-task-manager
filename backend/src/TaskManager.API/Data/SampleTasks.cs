using TaskManager.Domain.Entities;
using TaskManager.Domain.Repositories;

namespace TaskManager.API.Data;

internal sealed class SampleTasks : ITaskRepository
{
    private static readonly IReadOnlyList<TaskItem> Items =
    [
        new(1, "Configurar entorno de desarrollo", "Instalar SDKs y dependencias base.", "HIGH", "Alta", "DONE", "Completada"),
        new(2, "Diseñar esquema de base de datos", "Definir tablas de tareas, prioridades y estados.", "HIGH", "Alta", "DONE", "Completada"),
        new(3, "Implementar microservicio REST", "Exponer endpoints para consultar tareas.", "HIGH", "Alta", "IN_PROGRESS", "En progreso"),
        new(4, "Construir pantalla de listado", "Mostrar tareas con prioridad y estado.", "MEDIUM", "Media", "PENDING", "Pendiente"),
        new(5, "Agregar filtros", "Permitir filtrar por estado y prioridad.", "MEDIUM", "Media", "PENDING", "Pendiente")
    ];

    public Task<IReadOnlyList<TaskItem>> GetAllAsync(
        string? status,
        string? priority,
        CancellationToken cancellationToken = default)
    {
        var query = Items.AsEnumerable();

        if (!string.IsNullOrWhiteSpace(status))
        {
            query = query.Where(task =>
                string.Equals(task.StatusCode, status.Trim(), StringComparison.OrdinalIgnoreCase));
        }

        if (!string.IsNullOrWhiteSpace(priority))
        {
            query = query.Where(task =>
                string.Equals(task.PriorityCode, priority.Trim(), StringComparison.OrdinalIgnoreCase));
        }

        return Task.FromResult<IReadOnlyList<TaskItem>>(query.ToList());
    }

    public Task<TaskItem?> GetByIdAsync(
        int id,
        CancellationToken cancellationToken = default) =>
        Task.FromResult(Items.FirstOrDefault(task => task.Id == id));
}
