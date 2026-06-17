import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
});
