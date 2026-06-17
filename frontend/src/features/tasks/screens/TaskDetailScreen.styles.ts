import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
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
});
