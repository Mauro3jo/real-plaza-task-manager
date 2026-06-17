import React, {useMemo, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {EmptyList, StateView} from './src/components/StateViews';
import {TaskCard} from './src/features/tasks/components/TaskCard';
import {TaskFilters} from './src/features/tasks/components/TaskFilters';
import {useFilterOptions} from './src/features/tasks/hooks/useFilterOptions';
import {useTaskDetail} from './src/features/tasks/hooks/useTaskDetail';
import {useTasks} from './src/features/tasks/hooks/useTasks';
import {TaskDetailScreen} from './src/features/tasks/screens/TaskDetailScreen';
import {styles} from './src/styles/appStyles';

function App(): React.JSX.Element {
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [selectedPriority, setSelectedPriority] = useState<string>();
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const {filterOptions, filtersError} = useFilterOptions();
  const {
    task: selectedTask,
    isLoading: isDetailLoading,
    error: detailError,
    loadTaskDetail,
    clearTaskDetail,
  } = useTaskDetail(selectedTaskId);

  const taskFilters = useMemo(
    () => ({
      status: selectedStatus,
      priority: selectedPriority,
    }),
    [selectedPriority, selectedStatus],
  );
  const {tasks, isLoading, isRefreshing, error, loadTasks} =
    useTasks(taskFilters);

  const activeFilterCount = [selectedStatus, selectedPriority].filter(Boolean).length;
  const hasActiveFilters = activeFilterCount > 0;

  const clearFilters = () => {
    setSelectedStatus(undefined);
    setSelectedPriority(undefined);
  };

  const openTaskDetail = (id: number) => {
    setSelectedTaskId(id);
  };

  const closeTaskDetail = () => {
    setSelectedTaskId(null);
    clearTaskDetail();
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
          onRetry={loadTaskDetail}
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

export default App;
