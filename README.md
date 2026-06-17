# Real Plaza Task Manager

Solución fullstack para el reto técnico de Real Plaza.

Permite listar tareas, filtrar por estado/prioridad y ver el detalle de una tarea desde una app React Native conectada a una API .NET. La API usa SQL Server y consulta la base con procedimientos almacenados.

## Stack

- .NET 8 Web API
- React Native CLI 0.74 + TypeScript
- SQL Server
- Dapper
- Swagger
- xUnit y Jest para pruebas unitarias

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

frontend/
  App.tsx
  src/
    api/                  cliente HTTP y endpoints
    config/               URL base por plataforma
    components/           componentes reutilizables
    domain/               tipos del contrato
    features/tasks/       pantallas, hooks y componentes de tareas
    navigation/           stack y tipos de rutas
    theme/                tokens visuales
    styles/               estilos de la app
  android/

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

## Ejecutar frontend

Instalar dependencias:

```powershell
cd frontend
npm install
```

Levantar Metro:

```powershell
npm start
```

En otra terminal, con el emulador Android abierto:

```powershell
cd frontend
npm run android -- --no-packager
```

La app usa `http://10.0.2.2:5080` en el emulador Android para llegar al backend local. En iOS usa `http://localhost:5080`.

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
cd frontend
npm test
npm run lint
npm run format:check
npm run tsc
```

## Notas técnicas

Dejé un resumen de arquitectura y flujo en:

```text
docs/architecture.md
```

