import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getFilterOptions, getTaskById, getTasks} from './src/api/tasksApi';
import {CatalogOption, FilterOptions, TaskItem} from './src/domain/task';

const emptyFilterOptions: FilterOptions = {
  priorities: [],
  statuses: [],
};

function App(): React.JSX.Element {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [filterOptions, setFilterOptions] =
    useState<FilterOptions>(emptyFilterOptions);
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [selectedPriority, setSelectedPriority] = useState<string>();
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [filtersError, setFiltersError] = useState<string | null>(null);

  const hasActiveFilters = Boolean(selectedStatus || selectedPriority);

  const loadFilterOptions = useCallback(async () => {
    try {
      const result = await getFilterOptions();
      setFilterOptions(result);
      setFiltersError(null);
    } catch {
      setFiltersError('No se pudieron cargar los filtros.');
    }
  }, []);

  const loadTasks = useCallback(
    async (refreshing = false) => {
      if (refreshing) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      setError(null);

      try {
        const result = await getTasks({
          status: selectedStatus,
          priority: selectedPriority,
        });
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
    [selectedPriority, selectedStatus],
  );

  const loadTaskDetail = useCallback(async (id: number) => {
    setIsDetailLoading(true);
    setDetailError(null);
    setSelectedTask(null);

    try {
      const result = await getTaskById(id);
      setSelectedTask(result);
    } catch (err) {
      setDetailError(
        err instanceof Error ? err.message : 'No se pudo cargar el detalle.',
      );
    } finally {
      setIsDetailLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFilterOptions();
  }, [loadFilterOptions]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const clearFilters = () => {
    setSelectedStatus(undefined);
    setSelectedPriority(undefined);
  };

  const openTaskDetail = (id: number) => {
    setSelectedTaskId(id);
    loadTaskDetail(id);
  };

  const closeTaskDetail = () => {
    setSelectedTaskId(null);
    setSelectedTask(null);
    setDetailError(null);
  };

  const taskId = selectedTaskId;

  if (taskId !== null) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />
        <TaskDetailScreen
          error={detailError}
          isLoading={isDetailLoading}
          task={selectedTask}
          taskId={taskId}
          onBack={closeTaskDetail}
          onRetry={() => loadTaskDetail(taskId)}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />
      <View style={styles.header}>
        <Text style={styles.title}>Mis tareas</Text>
        <Text style={styles.subtitle}>Datos desde la API .NET</Text>
      </View>

      <FilterPanel
        filterOptions={filterOptions}
        filtersError={filtersError}
        hasActiveFilters={hasActiveFilters}
        selectedPriority={selectedPriority}
        selectedStatus={selectedStatus}
        onChangePriority={setSelectedPriority}
        onChangeStatus={setSelectedStatus}
        onClear={clearFilters}
      />

      {isLoading ? (
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color="#1D4ED8" />
          <Text style={styles.stateText}>Cargando tareas...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerState}>
          <Text style={styles.errorTitle}>No se pudo cargar</Text>
          <Text style={styles.stateText}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={() => loadTasks()}>
            <Text style={styles.retryText}>Reintentar</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => loadTasks(true)}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.stateText}>
                {hasActiveFilters
                  ? 'No hay tareas con estos filtros.'
                  : 'No hay tareas para mostrar.'}
              </Text>
            </View>
          }
          renderItem={({item}) => (
            <TaskCard task={item} onPress={() => openTaskDetail(item.id)} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

function TaskDetailScreen({
  error,
  isLoading,
  task,
  taskId,
  onBack,
  onRetry,
}: {
  error: string | null;
  isLoading: boolean;
  task: TaskItem | null;
  taskId: number;
  onBack: () => void;
  onRetry: () => void;
}) {
  return (
    <View style={styles.detailScreen}>
      <View style={styles.detailHeader}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>Volver</Text>
        </Pressable>
        <Text style={styles.detailHeaderTitle}>Detalle de tarea</Text>
      </View>

      {isLoading ? (
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color="#1D4ED8" />
          <Text style={styles.stateText}>Cargando detalle...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerState}>
          <Text style={styles.errorTitle}>No se pudo cargar</Text>
          <Text style={styles.stateText}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={onRetry}>
            <Text style={styles.retryText}>Reintentar</Text>
          </Pressable>
        </View>
      ) : task ? (
        <View style={styles.detailContent}>
          <Text style={styles.detailId}>Tarea #{task.id}</Text>
          <Text style={styles.detailTitle}>{task.title}</Text>

          <View style={styles.badges}>
            <Badge label={task.priorityName} tone="priority" />
            <Badge label={task.statusName} tone="status" />
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.detailLabel}>Descripcion</Text>
            <Text style={styles.detailDescription}>{task.description}</Text>
          </View>

          <View style={styles.detailRows}>
            <InfoRow label="Prioridad" value={task.priorityName} />
            <InfoRow label="Estado" value={task.statusName} />
          </View>
        </View>
      ) : (
        <View style={styles.centerState}>
          <Text style={styles.stateText}>No se encontro la tarea #{taskId}.</Text>
        </View>
      )}
    </View>
  );
}

function InfoRow({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function FilterPanel({
  filterOptions,
  filtersError,
  hasActiveFilters,
  selectedPriority,
  selectedStatus,
  onChangePriority,
  onChangeStatus,
  onClear,
}: {
  filterOptions: FilterOptions;
  filtersError: string | null;
  hasActiveFilters: boolean;
  selectedPriority?: string;
  selectedStatus?: string;
  onChangePriority: (code?: string) => void;
  onChangeStatus: (code?: string) => void;
  onClear: () => void;
}) {
  return (
    <View style={styles.filterPanel}>
      <View style={styles.filterHeader}>
        <Text style={styles.filterTitle}>Filtros</Text>
        {hasActiveFilters ? (
          <Pressable onPress={onClear}>
            <Text style={styles.clearText}>Limpiar</Text>
          </Pressable>
        ) : null}
      </View>

      <FilterGroup
        label="Estado"
        options={filterOptions.statuses}
        selectedCode={selectedStatus}
        onChange={onChangeStatus}
      />
      <FilterGroup
        label="Prioridad"
        options={filterOptions.priorities}
        selectedCode={selectedPriority}
        onChange={onChangePriority}
      />

      {filtersError ? (
        <Text style={styles.filterError}>{filtersError}</Text>
      ) : null}
    </View>
  );
}

function FilterGroup({
  label,
  options,
  selectedCode,
  onChange,
}: {
  label: string;
  options: CatalogOption[];
  selectedCode?: string;
  onChange: (code?: string) => void;
}) {
  return (
    <View style={styles.filterGroup}>
      <Text style={styles.filterLabel}>{label}</Text>
      <View style={styles.filterOptions}>
        <FilterChip
          label="Todos"
          selected={!selectedCode}
          onPress={() => onChange(undefined)}
        />
        {options.map(option => (
          <FilterChip
            key={option.code}
            label={option.name}
            selected={selectedCode === option.code}
            onPress={() => onChange(option.code)}
          />
        ))}
      </View>
    </View>
  );
}

function FilterChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.filterChip, selected ? styles.filterChipSelected : null]}
      onPress={onPress}>
      <Text
        style={[
          styles.filterChipText,
          selected ? styles.filterChipTextSelected : null,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

function TaskCard({task, onPress}: {task: TaskItem; onPress: () => void}) {
  return (
    <Pressable
      style={({pressed}) => [styles.card, pressed ? styles.cardPressed : null]}
      onPress={onPress}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{task.title}</Text>
        <Text style={styles.taskId}>#{task.id}</Text>
      </View>
      <Text style={styles.description}>{task.description}</Text>
      <View style={styles.badges}>
        <Badge label={task.priorityName} tone="priority" />
        <Badge label={task.statusName} tone="status" />
      </View>
    </Pressable>
  );
}

function Badge({label, tone}: {label: string; tone: 'priority' | 'status'}) {
  return (
    <View
      style={[
        styles.badge,
        tone === 'priority' ? styles.priority : styles.status,
      ]}>
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
  },
  title: {
    color: '#111827',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 4,
  },
  detailScreen: {
    flex: 1,
  },
  detailHeader: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backButton: {
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  backText: {
    color: '#1D4ED8',
    fontSize: 15,
    fontWeight: '700',
  },
  detailHeaderTitle: {
    color: '#111827',
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    marginRight: 45,
    textAlign: 'center',
  },
  detailContent: {
    padding: 20,
  },
  detailId: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  detailTitle: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
  },
  detailSection: {
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: 24,
    paddingTop: 18,
  },
  detailLabel: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  detailDescription: {
    color: '#374151',
    fontSize: 16,
    lineHeight: 24,
  },
  detailRows: {
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: 24,
  },
  infoRow: {
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  infoLabel: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '700',
  },
  infoValue: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
  },
  filterPanel: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterTitle: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
  },
  clearText: {
    color: '#1D4ED8',
    fontSize: 13,
    fontWeight: '700',
  },
  filterGroup: {
    marginTop: 8,
  },
  filterLabel: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  filterChipSelected: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  filterChipText: {
    color: '#374151',
    fontSize: 13,
    fontWeight: '700',
  },
  filterChipTextSelected: {
    color: '#FFFFFF',
  },
  filterError: {
    color: '#991B1B',
    fontSize: 13,
    marginTop: 10,
  },
  listContent: {
    padding: 16,
    paddingBottom: 28,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    marginBottom: 12,
  },
  cardPressed: {
    borderColor: '#93C5FD',
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: '#111827',
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
  },
  taskId: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '600',
  },
  description: {
    color: '#4B5563',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  priority: {
    backgroundColor: '#DBEAFE',
  },
  status: {
    backgroundColor: '#DCFCE7',
  },
  badgeText: {
    color: '#111827',
    fontSize: 12,
    fontWeight: '700',
  },
  centerState: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  emptyState: {
    alignItems: 'center',
    padding: 24,
  },
  stateText: {
    color: '#6B7280',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    textAlign: 'center',
  },
  errorTitle: {
    color: '#991B1B',
    fontSize: 18,
    fontWeight: '700',
  },
  retryButton: {
    backgroundColor: '#1D4ED8',
    borderRadius: 8,
    marginTop: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default App;
