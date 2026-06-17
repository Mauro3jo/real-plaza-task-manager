import {API_BASE_URL} from '../config/env';
import {TaskItem} from '../domain/task';

type ProblemDetails = {
  title?: string;
  detail?: string;
};

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    let message = `Error ${response.status}`;

    try {
      const body = (await response.json()) as ProblemDetails;
      message = body.detail || body.title || message;
    } catch {}

    throw new Error(message);
  }

  return (await response.json()) as T;
}

export function getTasks(): Promise<TaskItem[]> {
  return request<TaskItem[]>('/api/tasks');
}
