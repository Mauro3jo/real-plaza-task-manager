/* Procedimientos usados por la API de tareas. */

USE TaskManagerDb;
GO

/* Listado de tareas. Los filtros son opcionales para reutilizar el mismo SP
   en la vista general y en la vista filtrada. */
IF OBJECT_ID('tasks.usp_Tasks_GetList', 'P') IS NOT NULL
    DROP PROCEDURE tasks.usp_Tasks_GetList;
GO
CREATE PROCEDURE tasks.usp_Tasks_GetList
    @StatusId   TINYINT = NULL,
    @PriorityId TINYINT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        t.TaskId,
        t.Title,
        t.Description,
        t.PriorityId,
        p.Code      AS PriorityCode,
        p.Name      AS PriorityName,
        t.StatusId,
        s.Code      AS StatusCode,
        s.Name      AS StatusName,
        t.CreatedAt,
        t.UpdatedAt
    FROM tasks.Tasks AS t
    INNER JOIN tasks.Priorities AS p ON p.PriorityId = t.PriorityId
    INNER JOIN tasks.Statuses   AS s ON s.StatusId   = t.StatusId
    WHERE (@StatusId   IS NULL OR t.StatusId   = @StatusId)
      AND (@PriorityId IS NULL OR t.PriorityId = @PriorityId)
    ORDER BY p.SortOrder DESC, t.CreatedAt DESC;
END
GO

/* Detalle por id. El backend interpreta la ausencia de filas como 404. */
IF OBJECT_ID('tasks.usp_Tasks_GetById', 'P') IS NOT NULL
    DROP PROCEDURE tasks.usp_Tasks_GetById;
GO
CREATE PROCEDURE tasks.usp_Tasks_GetById
    @TaskId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        t.TaskId,
        t.Title,
        t.Description,
        t.PriorityId,
        p.Code      AS PriorityCode,
        p.Name      AS PriorityName,
        t.StatusId,
        s.Code      AS StatusCode,
        s.Name      AS StatusName,
        t.CreatedAt,
        t.UpdatedAt
    FROM tasks.Tasks AS t
    INNER JOIN tasks.Priorities AS p ON p.PriorityId = t.PriorityId
    INNER JOIN tasks.Statuses   AS s ON s.StatusId   = t.StatusId
    WHERE t.TaskId = @TaskId;
END
GO

/* Opciones de filtro para la app. Se devuelven juntas porque son catálogos chicos. */
IF OBJECT_ID('tasks.usp_FilterOptions_Get', 'P') IS NOT NULL
    DROP PROCEDURE tasks.usp_FilterOptions_Get;
GO
CREATE PROCEDURE tasks.usp_FilterOptions_Get
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        CatalogType,
        Id,
        Code,
        Name,
        SortOrder
    FROM
    (
        SELECT
            CAST('priority' AS VARCHAR(20)) AS CatalogType,
            CAST(PriorityId AS INT)         AS Id,
            Code,
            Name,
            SortOrder
        FROM tasks.Priorities

        UNION ALL

        SELECT
            CAST('status' AS VARCHAR(20)) AS CatalogType,
            CAST(StatusId AS INT)         AS Id,
            Code,
            Name,
            SortOrder
        FROM tasks.Statuses
    ) AS options
    ORDER BY CatalogType, SortOrder;
END
GO

PRINT 'Procedimientos almacenados creados correctamente.';
GO
