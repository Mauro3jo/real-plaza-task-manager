import {API_BASE_URL} from '../config/env';
import {FilterOptions, TaskFilters, TaskItem} from '../domain/task';

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

function buildTaskPath(filters: TaskFilters): string {
  const query = new URLSearchParams();

  if (filters.status) {
    query.append('status', filters.status);
  }

  if (filters.priority) {
    query.append('priority', filters.priority);
  }

  const queryString = query.toString();
  return queryString ? `/api/tasks?${queryString}` : '/api/tasks';
}

export function getTasks(filters: TaskFilters = {}): Promise<TaskItem[]> {
  return request<TaskItem[]>(buildTaskPath(filters));
}

export function getTaskById(id: number): Promise<TaskItem> {
  return request<TaskItem>(`/api/tasks/${id}`);
}

export function getFilterOptions(): Promise<FilterOptions> {
  return request<FilterOptions>('/api/catalog/filter-options');
}
