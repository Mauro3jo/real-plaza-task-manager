import {apiGet} from '../apiClient';
import {getFilterOptions, getTaskById, getTasks} from '../tasksApi';

jest.mock('../apiClient', () => ({
  apiGet: jest.fn(),
}));

const apiGetMock = apiGet as jest.Mock;

beforeEach(() => {
  apiGetMock.mockReset();
});

describe('tasksApi', () => {
  it('consulta el listado sin filtros', async () => {
    apiGetMock.mockResolvedValueOnce([]);

    await getTasks();

    expect(apiGetMock).toHaveBeenCalledWith('/api/tasks');
  });

  it('envia estado y prioridad como query string', async () => {
    apiGetMock.mockResolvedValueOnce([]);

    await getTasks({status: 'DONE', priority: 'HIGH'});

    expect(apiGetMock).toHaveBeenCalledWith(
      '/api/tasks?status=DONE&priority=HIGH',
    );
  });

  it('consulta el detalle por id', async () => {
    apiGetMock.mockResolvedValueOnce({id: 7});

    await getTaskById(7);

    expect(apiGetMock).toHaveBeenCalledWith('/api/tasks/7');
  });

  it('consulta las opciones de filtros', async () => {
    apiGetMock.mockResolvedValueOnce({priorities: [], statuses: []});

    await getFilterOptions();

    expect(apiGetMock).toHaveBeenCalledWith('/api/catalog/filter-options');
  });
});
