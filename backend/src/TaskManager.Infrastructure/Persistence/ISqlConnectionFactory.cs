using System.Data;

namespace TaskManager.Infrastructure.Persistence;

public interface ISqlConnectionFactory
{
    IDbConnection CreateConnection();
}
