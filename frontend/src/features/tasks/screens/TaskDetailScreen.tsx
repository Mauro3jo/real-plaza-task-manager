import React from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {Badge} from '../../../components/Badge';
import {StateView} from '../../../components/StateViews';
import {TaskItem} from '../../../domain/task';
import {
  getPriorityColors,
  getStatusColors,
  styles,
} from '../../../styles/appStyles';

type TaskDetailScreenProps = {
  error: string | null;
  isLoading: boolean;
  task: TaskItem | null;
  taskId: number;
  onBack: () => void;
  onRetry: () => void;
};

export function TaskDetailScreen({
  error,
  isLoading,
  task,
  taskId,
  onBack,
  onRetry,
}: TaskDetailScreenProps) {
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
