namespace TaskManager.Application.Common;

public sealed class NotFoundException : Exception
{
    private NotFoundException(string message) : base(message)
    {
    }

    public static NotFoundException ForTask(int id) =>
        new($"No se encontro la tarea con id {id}.");
}
