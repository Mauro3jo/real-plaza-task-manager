import {apiGet} from './apiClient';
import {FilterOptions, TaskFilters, TaskItem} from '../domain/task';

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
  return apiGet<TaskItem[]>(buildTaskPath(filters));
}

export function getTaskById(id: number): Promise<TaskItem> {
  return apiGet<TaskItem>(`/api/tasks/${id}`);
}

export function getFilterOptions(): Promise<FilterOptions> {
  return apiGet<FilterOptions>('/api/catalog/filter-options');
}
