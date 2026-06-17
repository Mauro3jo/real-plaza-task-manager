import {useCallback, useEffect, useState} from 'react';
import {getTaskById} from '../../../api/tasksApi';
import {TaskItem} from '../../../domain/task';

type UseTaskDetailResult = {
  task: TaskItem | null;
  isLoading: boolean;
  error: string | null;
  loadTaskDetail: () => Promise<void>;
  clearTaskDetail: () => void;
};

export function useTaskDetail(taskId: number | null): UseTaskDetailResult {
  const [task, setTask] = useState<TaskItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearTaskDetail = useCallback(() => {
    setTask(null);
    setError(null);
  }, []);

  const loadTaskDetail = useCallback(async () => {
    if (taskId === null) {
      clearTaskDetail();
      return;
    }

    setIsLoading(true);
    setError(null);
    setTask(null);

    try {
      const result = await getTaskById(taskId);
      setTask(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'No se pudo cargar el detalle.',
      );
    } finally {
      setIsLoading(false);
    }
  }, [clearTaskDetail, taskId]);

  useEffect(() => {
    loadTaskDetail();
  }, [loadTaskDetail]);

  return {
    task,
    isLoading,
    error,
    loadTaskDetail,
    clearTaskDetail,
  };
}
