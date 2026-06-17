using TaskManager.Application.Services;
using TaskManager.Domain.Entities;
using TaskManager.Domain.Repositories;
using Xunit;

namespace TaskManager.UnitTests.Services;

public sealed class CatalogServiceTests
{
    [Fact]
    public async Task GetFilterOptionsAsync_returns_priorities_and_statuses()
    {
        var service = new CatalogService(new FakeCatalogRepository());

        var result = await service.GetFilterOptionsAsync();

        Assert.Equal(3, result.Priorities.Count);
        Assert.Equal(3, result.Statuses.Count);
        Assert.Contains(result.Priorities, option => option.Code == "HIGH");
        Assert.Contains(result.Statuses, option => option.Code == "PENDING");
    }

    private sealed class FakeCatalogRepository : ICatalogRepository
    {
        public Task<FilterOptions> GetFilterOptionsAsync(CancellationToken cancellationToken = default) =>
            Task.FromResult(new FilterOptions(
                [
                    new("LOW", "Baja"),
                    new("MEDIUM", "Media"),
                    new("HIGH", "Alta")
                ],
                [
                    new("PENDING", "Pendiente"),
                    new("IN_PROGRESS", "En progreso"),
                    new("DONE", "Completada")
                ]));
    }
}
