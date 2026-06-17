import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView, Text, View} from 'react-native';
import {Badge} from '../../../components/Badge';
import {Screen} from '../../../components/Screen';
import {StateView} from '../../../components/StateViews';
import {RootStackParamList} from '../../../navigation/types';
import {getPriorityColors, getStatusColors} from '../../../theme/theme';
import {useTaskDetail} from '../hooks/useTaskDetail';
import {styles} from './TaskDetailScreen.styles';

type TaskDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TaskDetail'
>;

export function TaskDetailScreen({
  route,
}: TaskDetailScreenProps) {
  const {taskId} = route.params;
  const {task, isLoading, error, loadTaskDetail} = useTaskDetail(taskId);

  return (
    <Screen edges={['left', 'right', 'bottom']}>
      {isLoading ? (
        <StateView message="Cargando detalle..." />
      ) : error ? (
        <StateView
          message={error}
          title="No se pudo cargar"
          actionLabel="Reintentar"
          onAction={loadTaskDetail}
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
    </Screen>
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
