import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

const {colors, font, fontWeight, radius, spacing} = theme;

export const styles = StyleSheet.create({
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: spacing.screen,
    paddingHorizontal: spacing.header,
    paddingTop: spacing.header,
  },
  headerText: {
    flex: 1,
    paddingRight: spacing.screen,
  },
  title: {
    color: colors.textPrimary,
    fontSize: font.display,
    fontWeight: fontWeight.strong,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: font.md,
    marginTop: spacing.sm,
  },
  apiPill: {
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  apiPillText: {
    color: colors.textPill,
    fontSize: font.xs,
    fontWeight: fontWeight.strong,
  },
  listContent: {
    padding: spacing.screen,
    paddingBottom: spacing.bottom,
  },
  listHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  listTitle: {
    color: colors.textPrimary,
    fontSize: font.xl,
    fontWeight: fontWeight.strong,
  },
  listSubtitle: {
    color: colors.textSecondary,
    fontSize: font.sm,
    marginTop: spacing.xxs,
  },
  countPill: {
    alignItems: 'center',
    backgroundColor: colors.textPrimary,
    borderRadius: radius.sm,
    justifyContent: 'center',
    minWidth: 40,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  countPillText: {
    color: colors.surface,
    fontSize: font.md,
    fontWeight: fontWeight.strong,
  },
});
