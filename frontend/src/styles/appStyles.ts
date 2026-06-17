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
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F7F9',
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerText: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    color: '#111827',
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: '#64748B',
    fontSize: 14,
    marginTop: 6,
  },
  apiPill: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D1D5DB',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  apiPillText: {
    color: '#374151',
    fontSize: 12,
    fontWeight: '800',
  },
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
  listContent: {
    padding: 16,
    paddingBottom: 28,
  },
  listHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  listTitle: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '800',
  },
  listSubtitle: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 2,
  },
  countPill: {
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 8,
    justifyContent: 'center',
    minWidth: 40,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  countPillText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
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
  detailScreen: {
    flex: 1,
  },
  detailHeader: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backButton: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  backText: {
    color: '#1D4ED8',
    fontSize: 14,
    fontWeight: '800',
  },
  detailHeaderTitle: {
    color: '#111827',
    flex: 1,
    fontSize: 17,
    fontWeight: '800',
    marginRight: 65,
    textAlign: 'center',
  },
  detailContent: {
    padding: 16,
    paddingBottom: 28,
  },
  detailSummary: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
  },
  detailId: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 8,
  },
  detailTitle: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 31,
  },
  detailSection: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 12,
    padding: 18,
  },
  detailLabel: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  detailDescription: {
    color: '#334155',
    fontSize: 16,
    lineHeight: 24,
  },
  detailRows: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 12,
    overflow: 'hidden',
  },
  infoRow: {
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  infoLabel: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '800',
  },
  infoValue: {
    color: '#111827',
    flexShrink: 1,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'right',
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
