/* Script inicial de base de datos.
   Es idempotente para facilitar las pruebas locales y la revisión. */

IF DB_ID('TaskManagerDb') IS NULL
BEGIN
    CREATE DATABASE TaskManagerDb;
END
GO

USE TaskManagerDb;
GO

/* Esquema propio para separar los objetos del módulo de tareas. */
IF SCHEMA_ID('tasks') IS NULL
    EXEC('CREATE SCHEMA tasks;');
GO

/* Catálogo de prioridades usado por los filtros y por el detalle de tarea. */
IF OBJECT_ID('tasks.Priorities', 'U') IS NULL
BEGIN
    CREATE TABLE tasks.Priorities
    (
        PriorityId  TINYINT       NOT NULL CONSTRAINT PK_Priorities PRIMARY KEY,
        Code        VARCHAR(20)   NOT NULL,
        Name        NVARCHAR(50)  NOT NULL,
        SortOrder   TINYINT       NOT NULL,
        CONSTRAINT UQ_Priorities_Code UNIQUE (Code)
    );
END
GO

/* Catálogo de estados usado por los filtros y por el listado. */
IF OBJECT_ID('tasks.Statuses', 'U') IS NULL
BEGIN
    CREATE TABLE tasks.Statuses
    (
        StatusId    TINYINT       NOT NULL CONSTRAINT PK_Statuses PRIMARY KEY,
        Code        VARCHAR(20)   NOT NULL,
        Name        NVARCHAR(50)  NOT NULL,
        SortOrder   TINYINT       NOT NULL,
        CONSTRAINT UQ_Statuses_Code UNIQUE (Code)
    );
END
GO

/* La tabla principal referencia catálogos para evitar textos libres repetidos. */
IF OBJECT_ID('tasks.Tasks', 'U') IS NULL
BEGIN
    CREATE TABLE tasks.Tasks
    (
        TaskId       INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Tasks PRIMARY KEY,
        Title        NVARCHAR(150)     NOT NULL,
        Description  NVARCHAR(2000)    NULL,
        PriorityId   TINYINT           NOT NULL,
        StatusId     TINYINT           NOT NULL,
        CreatedAt    DATETIME2(0)      NOT NULL CONSTRAINT DF_Tasks_CreatedAt DEFAULT (SYSUTCDATETIME()),
        UpdatedAt    DATETIME2(0)      NULL,
        CONSTRAINT FK_Tasks_Priorities FOREIGN KEY (PriorityId) REFERENCES tasks.Priorities (PriorityId),
        CONSTRAINT FK_Tasks_Statuses   FOREIGN KEY (StatusId)   REFERENCES tasks.Statuses (StatusId)
    );

    /* Índices sobre las columnas usadas por los filtros principales. */
    CREATE INDEX IX_Tasks_StatusId   ON tasks.Tasks (StatusId);
    CREATE INDEX IX_Tasks_PriorityId ON tasks.Tasks (PriorityId);
END
GO

/* Catálogos base. MERGE evita duplicados si se vuelve a ejecutar el script. */

/* Prioridades */
MERGE tasks.Priorities AS target
USING (VALUES
    (1, 'LOW',    N'Baja',  1),
    (2, 'MEDIUM', N'Media', 2),
    (3, 'HIGH',   N'Alta',  3)
) AS source (PriorityId, Code, Name, SortOrder)
ON target.PriorityId = source.PriorityId
WHEN NOT MATCHED BY TARGET THEN
    INSERT (PriorityId, Code, Name, SortOrder)
    VALUES (source.PriorityId, source.Code, source.Name, source.SortOrder)
WHEN MATCHED THEN
    UPDATE SET Code = source.Code, Name = source.Name, SortOrder = source.SortOrder;
GO

/* Estados */
MERGE tasks.Statuses AS target
USING (VALUES
    (1, 'PENDING',     N'Pendiente',   1),
    (2, 'IN_PROGRESS', N'En progreso', 2),
    (3, 'DONE',        N'Completada',  3)
) AS source (StatusId, Code, Name, SortOrder)
ON target.StatusId = source.StatusId
WHEN NOT MATCHED BY TARGET THEN
    INSERT (StatusId, Code, Name, SortOrder)
    VALUES (source.StatusId, source.Code, source.Name, source.SortOrder)
WHEN MATCHED THEN
    UPDATE SET Code = source.Code, Name = source.Name, SortOrder = source.SortOrder;
GO

/* Datos de ejemplo para validar listado, filtros y detalle desde el primer arranque. */
IF NOT EXISTS (SELECT 1 FROM tasks.Tasks)
BEGIN
    INSERT INTO tasks.Tasks (Title, Description, PriorityId, StatusId, CreatedAt)
    VALUES
        (N'Configurar entorno de desarrollo',
         N'Instalar .NET SDK, Node y dependencias del proyecto para arrancar.',
         3, 3, DATEADD(DAY, -10, SYSUTCDATETIME())),

        (N'Diseñar esquema de base de datos',
         N'Definir tablas Tasks, Priorities y Statuses con sus relaciones.',
         3, 3, DATEADD(DAY, -9, SYSUTCDATETIME())),

        (N'Implementar microservicio REST',
         N'Endpoints para listar y obtener detalle de tareas usando stored procedures.',
         3, 2, DATEADD(DAY, -7, SYSUTCDATETIME())),

        (N'Construir pantalla de listado',
         N'Mostrar tareas con su prioridad y estado en React Native.',
         2, 2, DATEADD(DAY, -6, SYSUTCDATETIME())),

        (N'Agregar filtros por estado y prioridad',
         N'Permitir filtrar la lista combinando estado y prioridad.',
         2, 1, DATEADD(DAY, -5, SYSUTCDATETIME())),

        (N'Pantalla de detalle de tarea',
         N'Vista con la información completa de una tarea seleccionada.',
         2, 1, DATEADD(DAY, -4, SYSUTCDATETIME())),

        (N'Escribir pruebas unitarias',
         N'Cubrir la lógica del servicio de tareas en el backend.',
         1, 1, DATEADD(DAY, -3, SYSUTCDATETIME())),

        (N'Redactar documentación técnica',
         N'README, diagramas de arquitectura y justificación de decisiones.',
         1, 1, DATEADD(DAY, -2, SYSUTCDATETIME())),

        (N'Revisar accesibilidad de la UI',
         N'Contraste de colores y tamaños de toque adecuados.',
         1, 1, DATEADD(DAY, -1, SYSUTCDATETIME())),

        (N'Preparar datos de prueba',
         N'Cargar tareas de ejemplo representativas para la demo.',
         2, 3, SYSUTCDATETIME());
END
GO

PRINT 'Esquema y datos de prueba creados correctamente.';
GO
