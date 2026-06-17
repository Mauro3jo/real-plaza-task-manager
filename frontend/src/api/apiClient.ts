import {API_BASE_URL} from '../config/env';

type ProblemDetails = {
  title?: string;
  detail?: string;
};

export class ApiError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`);
  } catch {
    throw new ApiError(
      'No se pudo conectar con la API. Verifica que el backend esté levantado.',
    );
  }

  if (!response.ok) {
    throw new ApiError(await getErrorMessage(response), response.status);
  }

  return (await response.json()) as T;
}

async function getErrorMessage(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as ProblemDetails;
    return body.detail || body.title || `Error ${response.status}`;
  } catch {
    return `Error ${response.status}`;
  }
}
