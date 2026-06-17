import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {getFilterOptions, getTaskById, getTasks} from './src/api/tasksApi';
import {Badge} from './src/components/Badge';
import {EmptyList, StateView} from './src/components/StateViews';
import {FilterOptions, TaskItem} from './src/domain/task';
import {TaskCard} from './src/features/tasks/components/TaskCard';
import {TaskFilters} from './src/features/tasks/components/TaskFilters';
import {
  getPriorityColors,
  getStatusColors,
  styles,
} from './src/styles/appStyles';

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
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [filtersError, setFiltersError] = useState<string | null>(null);

  const activeFilterCount = [selectedStatus, selectedPriority].filter(Boolean).length;
  const hasActiveFilters = activeFilterCount > 0;

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
        <StatusBar barStyle="dark-content" backgroundColor="#F6F7F9" />
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
      <StatusBar barStyle="dark-content" backgroundColor="#F6F7F9" />
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Mis tareas</Text>
          <Text style={styles.subtitle}>
            {isLoading
              ? 'Sincronizando con la API'
              : `${tasks.length} ${tasks.length === 1 ? 'tarea' : 'tareas'} en vista`}
          </Text>
        </View>
        <View style={styles.apiPill}>
          <Text style={styles.apiPillText}>API .NET</Text>
        </View>
      </View>

      <TaskFilters
        activeFilterCount={activeFilterCount}
        expanded={isFilterPanelOpen}
        filterOptions={filterOptions}
        filtersError={filtersError}
        hasActiveFilters={hasActiveFilters}
        selectedPriority={selectedPriority}
        selectedStatus={selectedStatus}
        onChangePriority={setSelectedPriority}
        onChangeStatus={setSelectedStatus}
        onClear={clearFilters}
        onToggle={() => setIsFilterPanelOpen(value => !value)}
      />

      {isLoading ? (
        <StateView message="Cargando tareas..." />
      ) : error ? (
        <StateView
          message={error}
          title="No se pudo cargar"
          actionLabel="Reintentar"
          onAction={() => loadTasks()}
        />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <ListHeader
              activeFilterCount={activeFilterCount}
              hasActiveFilters={hasActiveFilters}
              tasksCount={tasks.length}
            />
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => loadTasks(true)}
              tintColor="#2563EB"
            />
          }
          ListEmptyComponent={
            <EmptyList hasActiveFilters={hasActiveFilters} />
          }
          renderItem={({item}) => (
            <TaskCard task={item} onPress={() => openTaskDetail(item.id)} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

function ListHeader({
  activeFilterCount,
  hasActiveFilters,
  tasksCount,
}: {
  activeFilterCount: number;
  hasActiveFilters: boolean;
  tasksCount: number;
}) {
  return (
    <View style={styles.listHeader}>
      <View>
        <Text style={styles.listTitle}>Listado</Text>
        <Text style={styles.listSubtitle}>
          {hasActiveFilters
            ? `${activeFilterCount} ${activeFilterCount === 1 ? 'filtro aplicado' : 'filtros aplicados'}`
            : 'Todas las tareas'}
        </Text>
      </View>
      <View style={styles.countPill}>
        <Text style={styles.countPillText}>{tasksCount}</Text>
      </View>
    </View>
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
        <Text style={styles.detailHeaderTitle}>Detalle</Text>
      </View>

      {isLoading ? (
        <StateView message="Cargando detalle..." />
      ) : error ? (
        <StateView
          message={error}
          title="No se pudo cargar"
          actionLabel="Reintentar"
          onAction={onRetry}
        />
      ) : task ? (
        <ScrollView contentContainerStyle={styles.detailContent}>
          <View style={styles.detailSummary}>
            <Text style={styles.detailId}>Tarea #{task.id}</Text>
            <Text style={styles.detailTitle}>{task.title}</Text>
            <View style={styles.badges}>
              <Badge
                colors={getPriorityColors(task.priorityCode)}
                label={task.priorityName}
              />
              <Badge
                colors={getStatusColors(task.statusCode)}
                label={task.statusName}
              />
            </View>
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.detailLabel}>Descripción</Text>
            <Text style={styles.detailDescription}>{task.description}</Text>
          </View>

          <View style={styles.detailRows}>
            <InfoRow label="Prioridad" value={task.priorityName} />
            <InfoRow label="Estado" value={task.statusName} />
          </View>
        </ScrollView>
      ) : (
        <StateView message={`No se encontró la tarea #${taskId}.`} />
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

export default App;
