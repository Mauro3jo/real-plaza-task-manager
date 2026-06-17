using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;

namespace TaskManager.Infrastructure.Persistence;

public sealed class SqlConnectionFactory : ISqlConnectionFactory
{
    private readonly string _connectionString;

    public SqlConnectionFactory(IOptions<DatabaseOptions> options)
    {
        _connectionString = options.Value.ConnectionString;
    }

    public IDbConnection CreateConnection()
    {
        if (string.IsNullOrWhiteSpace(_connectionString))
            throw new InvalidOperationException("No se configuró la cadena de conexión.");

        return new SqlConnection(_connectionString);
    }
}
