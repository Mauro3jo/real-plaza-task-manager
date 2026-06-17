import React, {useMemo, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FlatList, RefreshControl, Text, View} from 'react-native';
import {Screen} from '../../../components/Screen';
import {EmptyList, StateView} from '../../../components/StateViews';
import {RootStackParamList} from '../../../navigation/types';
import {TaskCard} from '../components/TaskCard';
import {TaskFilters} from '../components/TaskFilters';
import {theme} from '../../../theme/theme';
import {useFilterOptions} from '../hooks/useFilterOptions';
import {useTasks} from '../hooks/useTasks';
import {styles} from './TaskListScreen.styles';

type TaskListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TaskList'
>;

export function TaskListScreen({navigation}: TaskListScreenProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [selectedPriority, setSelectedPriority] = useState<string>();
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const {filterOptions, filtersError} = useFilterOptions();

  const taskFilters = useMemo(
    () => ({
      status: selectedStatus,
      priority: selectedPriority,
    }),
    [selectedPriority, selectedStatus],
  );
  const {tasks, isLoading, isRefreshing, error, loadTasks} =
    useTasks(taskFilters);

  const activeFilterCount = [selectedStatus, selectedPriority].filter(
    Boolean,
  ).length;
  const hasActiveFilters = activeFilterCount > 0;

  const clearFilters = () => {
    setSelectedStatus(undefined);
    setSelectedPriority(undefined);
  };

  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Mis tareas</Text>
          <Text style={styles.subtitle}>
            {isLoading
              ? 'Sincronizando con la API'
              : `${tasks.length} ${
                  tasks.length === 1 ? 'tarea' : 'tareas'
                } en vista`}
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
              tintColor={theme.colors.primary}
            />
          }
          ListEmptyComponent={<EmptyList hasActiveFilters={hasActiveFilters} />}
          renderItem={({item}) => (
            <TaskCard
              task={item}
              onPress={() =>
                navigation.navigate('TaskDetail', {
                  taskId: item.id,
                  title: item.title,
                })
              }
            />
          )}
        />
      )}
    </Screen>
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
            ? `${activeFilterCount} ${
                activeFilterCount === 1
                  ? 'filtro aplicado'
                  : 'filtros aplicados'
              }`
            : 'Todas las tareas'}
        </Text>
      </View>
      <View style={styles.countPill}>
        <Text style={styles.countPillText}>{tasksCount}</Text>
      </View>
    </View>
  );
}
