import {useCallback, useEffect, useState} from 'react';
import {getTasks} from '../../../api/tasksApi';
import {TaskFilters, TaskItem} from '../../../domain/task';

type UseTasksResult = {
  tasks: TaskItem[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  loadTasks: (refreshing?: boolean) => Promise<void>;
};

export function useTasks(filters: TaskFilters): UseTasksResult {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(
    async (refreshing = false) => {
      if (refreshing) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      setError(null);

      try {
        const result = await getTasks(filters);
        setTasks(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'No se pudo cargar la lista.',
        );
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [filters],
  );

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return {
    tasks,
    isLoading,
    isRefreshing,
    error,
    loadTasks,
  };
}
