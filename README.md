# Real Plaza Task Manager

Proyecto fullstack para la prueba tecnica de Real Plaza.

La app permite listar tareas, filtrar por estado/prioridad y ver el detalle de cada tarea. El frontend esta hecho con React Native CLI y consume una API .NET conectada a SQL Server mediante stored procedures.

## Evaluacion rapida

Para revisar la version publicada:

```text
Swagger: http://187.77.226.115:8080/swagger
Health:  http://187.77.226.115:8080/health
```

La app movil quedo configurada para consumir esa API publicada desde `frontend/src/config/env.ts`.

Funcionalidades principales:

- listado de tareas;
- filtros por estado y prioridad;
- combinacion de filtros;
- detalle de tarea;
- estados de carga, error y lista vacia;
- pull to refresh en el listado.

## Stack

- .NET 8 Web API
- React Native CLI 0.74 + TypeScript
- SQL Server
- Dapper
- Swagger
- xUnit, Jest, ESLint y Prettier

## Requisitos previos

- .NET SDK 8
- SQL Server
- Node.js 18 o superior
- npm
- Android Studio
- JDK 17
- Emulador Android o dispositivo fisico
- `sqlcmd` para ejecutar los scripts desde consola

El proyecto fue desarrollado y probado en Windows.

## Estructura

```text
backend/
  src/
    TaskManager.API/             controllers, Swagger y middleware
    TaskManager.Application/     servicios, DTOs, validaciones y mapeos
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
    theme/                colores, espaciados y badges
    styles/               estilos compartidos
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

Los scripts crean `TaskManagerDb`, cargan datos de ejemplo y crean los stored procedures que usa la API.

## Configuracion

La conexion local esta en:

```text
backend/src/TaskManager.API/appsettings.Development.json
```

Valor actual:

```json
"Database": {
  "ConnectionString": "Server=localhost;Database=TaskManagerDb;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

Para la API publicada, la cadena de conexion se configura en el servidor mediante variable de entorno. No queda hardcodeada en el codigo.

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

Para esta entrega la app apunta a `http://187.77.226.115:8080`. Si se quiere probar contra el backend local desde emulador Android, se puede cambiar temporalmente `frontend/src/config/env.ts` a `http://10.0.2.2:5080`.

## APK Android

La APK no se versiona dentro del repositorio por peso. Si se adjunta una build para evaluacion, consume la API publicada:

```text
http://187.77.226.115:8080
```

Para generar una build local:

```powershell
cd frontend\android
.\gradlew.bat :app:assembleDebug
```

La salida queda en:

```text
frontend\android\app\build\outputs\apk\debug\app-debug.apk
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

Valores validos:

```text
status: PENDING, IN_PROGRESS, DONE
priority: LOW, MEDIUM, HIGH
```

## Pruebas

Backend:

```powershell
dotnet build backend\src\TaskManager.API\TaskManager.API.csproj -c Release
dotnet test backend\tests\TaskManager.UnitTests\TaskManager.UnitTests.csproj -c Release
```

Frontend:

```powershell
cd frontend
npm run lint
npm run format:check
npm run tsc
npm test -- --runInBand
```

Build Android:

```powershell
cd frontend\android
.\gradlew.bat :app:assembleDebug
```

## Alcance y notas

- No se incluye autenticacion porque no forma parte del alcance del reto.
- No se implementaron alta, edicion ni eliminacion de tareas.
- No se agrego paginacion porque el volumen de datos de prueba es chico.
- Swagger queda habilitado para facilitar la evaluacion de la API.
- La API valida filtros invalidos y responde `400`.
- Una tarea inexistente responde `404`.
- El acceso a datos se hace con parametros y stored procedures.

## Notas tecnicas

El detalle de arquitectura, flujo app/API/DB y decisiones esta en:

```text
docs/architecture.md
```
