import {StyleSheet} from 'react-native';

export type BadgeColors = {
  backgroundColor: string;
  borderColor: string;
  color: string;
};

export function getPriorityColors(code: string): BadgeColors {
  switch (code) {
    case 'HIGH':
      return {
        backgroundColor: '#FEE2E2',
        borderColor: '#FCA5A5',
        color: '#7F1D1D',
      };
    case 'MEDIUM':
      return {
        backgroundColor: '#FEF3C7',
        borderColor: '#FCD34D',
        color: '#78350F',
      };
    case 'LOW':
      return {
        backgroundColor: '#E0F2FE',
        borderColor: '#7DD3FC',
        color: '#075985',
      };
    default:
      return getNeutralColors();
  }
}

export function getStatusColors(code: string): BadgeColors {
  switch (code) {
    case 'DONE':
      return {
        backgroundColor: '#DCFCE7',
        borderColor: '#86EFAC',
        color: '#14532D',
      };
    case 'IN_PROGRESS':
      return {
        backgroundColor: '#DBEAFE',
        borderColor: '#93C5FD',
        color: '#1E3A8A',
      };
    case 'PENDING':
      return {
        backgroundColor: '#F3E8FF',
        borderColor: '#D8B4FE',
        color: '#581C87',
      };
    default:
      return getNeutralColors();
  }
}

export function getNeutralColors(): BadgeColors {
  return {
    backgroundColor: '#F1F5F9',
    borderColor: '#CBD5E1',
    color: '#334155',
  };
}

export const styles = StyleSheet.create({
  filterPanel: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    borderTopWidth: 1,
    paddingBottom: 10,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  filterBar: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  filterToggle: {
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 7,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  filterToggleText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  filterCountBadge: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    justifyContent: 'center',
    minWidth: 18,
    paddingHorizontal: 5,
  },
  filterCountText: {
    color: '#111827',
    fontSize: 11,
    fontWeight: '800',
  },
  activeFilters: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingRight: 8,
  },
  activeFilterChip: {
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderColor: '#CBD5E1',
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 7,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  activeFilterText: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '800',
    maxWidth: 110,
  },
  activeFilterRemove: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '800',
  },
  noFiltersText: {
    color: '#64748B',
    fontSize: 13,
  },
  clearInlineButton: {
    paddingHorizontal: 2,
    paddingVertical: 8,
  },
  clearInlineText: {
    color: '#2563EB',
    fontSize: 13,
    fontWeight: '800',
  },
  filterSheet: {
    borderTopWidth: 1,
    borderColor: '#EEF2F7',
    marginTop: 12,
    paddingTop: 10,
  },
  filterGroup: {
    marginTop: 8,
  },
  filterLabel: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  filterOptions: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 16,
  },
  filterChip: {
    backgroundColor: '#F8FAFC',
    borderColor: '#CBD5E1',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterChipText: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '800',
  },
  filterError: {
    color: '#991B1B',
    fontSize: 13,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    elevation: 1,
    marginBottom: 10,
    padding: 16,
    shadowColor: '#0F172A',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  cardPressed: {
    borderColor: '#93C5FD',
  },
  cardHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  cardTitleGroup: {
    flex: 1,
  },
  cardTitle: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 21,
  },
  taskId: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 4,
  },
  openDetailText: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '800',
    paddingTop: 2,
  },
  description: {
    color: '#475569',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  badge: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
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
  emptyTitle: {
    color: '#111827',
    fontSize: 17,
    fontWeight: '800',
  },
  stateText: {
    color: '#64748B',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    textAlign: 'center',
  },
  errorTitle: {
    color: '#991B1B',
    fontSize: 18,
    fontWeight: '800',
  },
  retryButton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    marginTop: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
