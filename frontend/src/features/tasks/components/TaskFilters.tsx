import React from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {CatalogOption, FilterOptions} from '../../../domain/task';
import {
  getNeutralColors,
  getPriorityColors,
  getStatusColors,
  type BadgeColors,
} from '../../../theme/theme';
import {styles} from '../../../styles/appStyles';

type FilterKind = 'status' | 'priority';

type TaskFiltersProps = {
  activeFilterCount: number;
  expanded: boolean;
  filterOptions: FilterOptions;
  filtersError: string | null;
  hasActiveFilters: boolean;
  selectedPriority?: string;
  selectedStatus?: string;
  onChangePriority: (code?: string) => void;
  onChangeStatus: (code?: string) => void;
  onClear: () => void;
  onToggle: () => void;
};

export function TaskFilters({
  activeFilterCount,
  expanded,
  filterOptions,
  filtersError,
  hasActiveFilters,
  selectedPriority,
  selectedStatus,
  onChangePriority,
  onChangeStatus,
  onClear,
  onToggle,
}: TaskFiltersProps) {
  const selectedStatusOption = filterOptions.statuses.find(
    option => option.code === selectedStatus,
  );
  const selectedPriorityOption = filterOptions.priorities.find(
    option => option.code === selectedPriority,
  );

  return (
    <View style={styles.filterPanel}>
      <View style={styles.filterBar}>
        <Pressable style={styles.filterToggle} onPress={onToggle}>
          <Text style={styles.filterToggleText}>
            {expanded ? 'Ocultar filtros' : 'Filtros'}
          </Text>
          {activeFilterCount ? (
            <View style={styles.filterCountBadge}>
              <Text style={styles.filterCountText}>{activeFilterCount}</Text>
            </View>
          ) : null}
        </Pressable>

        <ScrollView
          horizontal
          contentContainerStyle={styles.activeFilters}
          showsHorizontalScrollIndicator={false}>
          {selectedStatusOption ? (
            <ActiveFilterChip
              label={selectedStatusOption.name}
              onRemove={() => onChangeStatus(undefined)}
            />
          ) : null}
          {selectedPriorityOption ? (
            <ActiveFilterChip
              label={selectedPriorityOption.name}
              onRemove={() => onChangePriority(undefined)}
            />
          ) : null}
          {!hasActiveFilters ? (
            <Text style={styles.noFiltersText}>Sin filtros</Text>
          ) : null}
        </ScrollView>

        {hasActiveFilters ? (
          <Pressable style={styles.clearInlineButton} onPress={onClear}>
            <Text style={styles.clearInlineText}>Limpiar</Text>
          </Pressable>
        ) : null}
      </View>

      {expanded ? (
        <View style={styles.filterSheet}>
          <FilterGroup
            kind="status"
            label="Estado"
            options={filterOptions.statuses}
            selectedCode={selectedStatus}
            onChange={onChangeStatus}
          />
          <FilterGroup
            kind="priority"
            label="Prioridad"
            options={filterOptions.priorities}
            selectedCode={selectedPriority}
            onChange={onChangePriority}
          />
        </View>
      ) : null}

      {filtersError ? (
        <Text style={styles.filterError}>{filtersError}</Text>
      ) : null}
    </View>
  );
}

function ActiveFilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <Pressable style={styles.activeFilterChip} onPress={onRemove}>
      <Text numberOfLines={1} style={styles.activeFilterText}>
        {label}
      </Text>
      <Text style={styles.activeFilterRemove}>x</Text>
    </Pressable>
  );
}

function FilterGroup({
  kind,
  label,
  options,
  selectedCode,
  onChange,
}: {
  kind: FilterKind;
  label: string;
  options: CatalogOption[];
  selectedCode?: string;
  onChange: (code?: string) => void;
}) {
  return (
    <View style={styles.filterGroup}>
      <Text style={styles.filterLabel}>{label}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.filterOptions}
        showsHorizontalScrollIndicator={false}>
        <FilterChip
          colors={getNeutralColors()}
          label="Todos"
          selected={!selectedCode}
          onPress={() => onChange(undefined)}
        />
        {options.map(option => (
          <FilterChip
            colors={getFilterColors(kind, option.code)}
            key={option.code}
            label={option.name}
            selected={selectedCode === option.code}
            onPress={() => onChange(option.code)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function FilterChip({
  colors,
  label,
  selected,
  onPress,
}: {
  colors: BadgeColors;
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[
        styles.filterChip,
        selected
          ? {
              backgroundColor: colors.backgroundColor,
              borderColor: colors.borderColor,
            }
          : null,
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.filterChipText,
          selected ? {color: colors.color} : null,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

function getFilterColors(kind: FilterKind, code: string): BadgeColors {
  return kind === 'status' ? getStatusColors(code) : getPriorityColors(code);
}
