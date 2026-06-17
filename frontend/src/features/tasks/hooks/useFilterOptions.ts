import {useCallback, useEffect, useState} from 'react';
import {getFilterOptions} from '../../../api/tasksApi';
import {FilterOptions} from '../../../domain/task';

const emptyFilterOptions: FilterOptions = {
  priorities: [],
  statuses: [],
};

type UseFilterOptionsResult = {
  filterOptions: FilterOptions;
  filtersError: string | null;
};

export function useFilterOptions(): UseFilterOptionsResult {
  const [filterOptions, setFilterOptions] =
    useState<FilterOptions>(emptyFilterOptions);
  const [filtersError, setFiltersError] = useState<string | null>(null);

  const loadFilterOptions = useCallback(async () => {
    try {
      const result = await getFilterOptions();
      setFilterOptions(result);
      setFiltersError(null);
    } catch {
      setFiltersError('No se pudieron cargar los filtros.');
    }
  }, []);

  useEffect(() => {
    loadFilterOptions();
  }, [loadFilterOptions]);

  return {
    filterOptions,
    filtersError,
  };
}
