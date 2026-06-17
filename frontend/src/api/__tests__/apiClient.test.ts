jest.mock('../../config/env', () => ({
  API_BASE_URL: 'http://api.test',
}));

import {ApiError, apiGet} from '../apiClient';

const fetchMock = jest.fn();

function jsonResponse(body: unknown, ok = true, status = 200): Response {
  return {
    ok,
    status,
    json: jest.fn().mockResolvedValue(body),
  } as unknown as Response;
}

beforeEach(() => {
  fetchMock.mockReset();
  globalThis.fetch = fetchMock as unknown as typeof fetch;
});

describe('apiClient', () => {
  it('devuelve el json cuando la respuesta es correcta', async () => {
    const body = [{id: 1, title: 'Preparar datos'}];
    fetchMock.mockResolvedValueOnce(jsonResponse(body));

    await expect(apiGet('/api/tasks')).resolves.toEqual(body);

    expect(fetchMock).toHaveBeenCalledWith('http://api.test/api/tasks');
  });

  it('usa el detalle del error enviado por la API', async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({detail: 'Filtro invalido'}, false, 400),
    );

    await expect(apiGet('/api/tasks?status=BAD')).rejects.toMatchObject({
      name: 'ApiError',
      message: 'Filtro invalido',
      status: 400,
    });
  });

  it('muestra un mensaje claro si no puede conectar', async () => {
    fetchMock.mockRejectedValueOnce(new Error('network error'));

    await expect(apiGet('/api/tasks')).rejects.toThrow(ApiError);
    fetchMock.mockRejectedValueOnce(new Error('network error'));
    await expect(apiGet('/api/tasks')).rejects.toThrow('No se pudo conectar');
  });
});
