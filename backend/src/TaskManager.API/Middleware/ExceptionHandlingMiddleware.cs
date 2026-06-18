using System.Net;
using System.Text.Json;
using TaskManager.Application.Common;

namespace TaskManager.API.Middleware;

public sealed class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(
        RequestDelegate next,
        ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleAsync(context, ex);
        }
    }

    private async Task HandleAsync(HttpContext context, Exception exception)
    {
        var (statusCode, title, detail) = exception switch
        {
            ValidationException => (HttpStatusCode.BadRequest, "Solicitud invalida", exception.Message),
            NotFoundException => (HttpStatusCode.NotFound, "Recurso no encontrado", exception.Message),
            _ => (HttpStatusCode.InternalServerError, "Error interno", "No se pudo procesar la solicitud.")
        };

        if (statusCode == HttpStatusCode.InternalServerError)
            _logger.LogError(exception, "Error no controlado.");
        else
            _logger.LogWarning("Solicitud rechazada: {Message}", exception.Message);

        context.Response.ContentType = "application/problem+json";
        context.Response.StatusCode = (int)statusCode;

        var payload = JsonSerializer.Serialize(new
        {
            title,
            status = (int)statusCode,
            detail,
            traceId = context.TraceIdentifier
        }, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });

        await context.Response.WriteAsync(payload);
    }
}
