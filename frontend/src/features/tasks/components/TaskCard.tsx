import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {Badge} from '../../../components/Badge';
import {TaskItem} from '../../../domain/task';
import {styles} from '../../../styles/appStyles';
import {getPriorityColors, getStatusColors} from '../../../theme/theme';

type TaskCardProps = {
  task: TaskItem;
  onPress: () => void;
};

export function TaskCard({task, onPress}: TaskCardProps) {
  const priorityColors = getPriorityColors(task.priorityCode);
  const statusColors = getStatusColors(task.statusCode);

  return (
    <Pressable
      style={({pressed}) => [styles.card, pressed ? styles.cardPressed : null]}
      onPress={onPress}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleGroup}>
          <Text numberOfLines={2} style={styles.cardTitle}>
            {task.title}
          </Text>
          <Text style={styles.taskId}>#{task.id}</Text>
        </View>
        <Text style={styles.openDetailText}>Detalle</Text>
      </View>
      <Text numberOfLines={2} style={styles.description}>
        {task.description}
      </Text>
      <View style={styles.badges}>
        <Badge colors={priorityColors} label={task.priorityName} />
        <Badge colors={statusColors} label={task.statusName} />
      </View>
    </Pressable>
  );
}
