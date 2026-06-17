import React from 'react';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import {styles} from '../styles/appStyles';

type StateViewProps = {
  actionLabel?: string;
  message: string;
  onAction?: () => void;
  title?: string;
};

export function StateView({
  actionLabel,
  message,
  onAction,
  title,
}: StateViewProps) {
  return (
    <View style={styles.centerState}>
      {title ? (
        <Text style={styles.errorTitle}>{title}</Text>
      ) : (
        <ActivityIndicator size="large" color="#2563EB" />
      )}
      <Text style={styles.stateText}>{message}</Text>
      {actionLabel && onAction ? (
        <Pressable style={styles.retryButton} onPress={onAction}>
          <Text style={styles.retryText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function EmptyList({hasActiveFilters}: {hasActiveFilters: boolean}) {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>Sin tareas para mostrar</Text>
      <Text style={styles.stateText}>
        {hasActiveFilters
          ? 'Probá limpiar o cambiar los filtros.'
          : 'Todavía no hay tareas cargadas.'}
      </Text>
    </View>
  );
}
