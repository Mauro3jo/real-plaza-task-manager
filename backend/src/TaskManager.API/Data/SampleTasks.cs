using TaskManager.API.Models;

namespace TaskManager.API.Data;

internal static class SampleTasks
{
    private static readonly IReadOnlyList<TaskItemDto> Items =
    [
        new(1, "Configurar entorno de desarrollo", "Instalar SDKs y dependencias base.", "HIGH", "Alta", "DONE", "Completada"),
        new(2, "Diseñar esquema de base de datos", "Definir tablas de tareas, prioridades y estados.", "HIGH", "Alta", "DONE", "Completada"),
        new(3, "Implementar microservicio REST", "Exponer endpoints para consultar tareas.", "HIGH", "Alta", "IN_PROGRESS", "En progreso"),
        new(4, "Construir pantalla de listado", "Mostrar tareas con prioridad y estado.", "MEDIUM", "Media", "PENDING", "Pendiente"),
        new(5, "Agregar filtros", "Permitir filtrar por estado y prioridad.", "MEDIUM", "Media", "PENDING", "Pendiente")
    ];

    public static IReadOnlyList<TaskItemDto> GetAll() => Items;

    public static TaskItemDto? GetById(int id) =>
        Items.FirstOrDefault(task => task.Id == id);
}
