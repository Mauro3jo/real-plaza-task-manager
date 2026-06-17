# Real Plaza Task Manager

Backend para el reto técnico de Real Plaza.

Permite listar tareas, filtrar por estado/prioridad y ver el detalle de una tarea. La API usa SQL Server y consulta la base con procedimientos almacenados.

## Stack

- .NET 8 Web API
- SQL Server
- Dapper
- Swagger
- xUnit para pruebas unitarias

## Estructura

```text
backend/
  src/
    TaskManager.API/             API HTTP y Swagger
    TaskManager.Application/     casos de uso, DTOs y validaciones
    TaskManager.Domain/          entidades y contratos
    TaskManager.Infrastructure/  Dapper, SQL Server y repositorios
  tests/
    TaskManager.UnitTests/

database/
  01_schema_and_seed.sql
  02_stored_procedures.sql

docs/
  architecture.md
```

## Base de datos

Ejecutar los scripts en orden:

```powershell
sqlcmd -S localhost -E -i database\01_schema_and_seed.sql
sqlcmd -S localhost -E -i database\02_stored_procedures.sql
```

Los scripts crean la base `TaskManagerDb`, cargan datos de ejemplo y crean los procedimientos usados por la API.

## Config local

La conexión local está en:

```text
backend/src/TaskManager.API/appsettings.Development.json
```

Valor actual:

```json
"Database": {
  "ConnectionString": "Server=localhost;Database=TaskManagerDb;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

## Ejecutar backend

```powershell
dotnet run --project backend\src\TaskManager.API
```

Swagger:

```text
http://localhost:5080/swagger
```

## Endpoints

```text
GET /health
GET /api/catalog/filter-options
GET /api/tasks
GET /api/tasks?status=PENDING
GET /api/tasks?priority=HIGH
GET /api/tasks?status=DONE&priority=HIGH
GET /api/tasks/{id}
```

Valores válidos:

```text
status: PENDING, IN_PROGRESS, DONE
priority: LOW, MEDIUM, HIGH
```

## Pruebas

```powershell
dotnet test backend\tests\TaskManager.UnitTests\TaskManager.UnitTests.csproj
```

## Notas técnicas

Dejé un resumen de arquitectura y flujo en:

```text
docs/architecture.md
```

