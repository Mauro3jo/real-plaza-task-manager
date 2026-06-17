import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

const {colors, font, fontWeight, lineHeight, radius, spacing} = theme;

export const styles = StyleSheet.create({
  detailContent: {
    padding: spacing.screen,
    paddingBottom: spacing.bottom,
  },
  detailSummary: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.sm,
    borderWidth: 1,
    padding: spacing.section,
  },
  detailId: {
    color: colors.textSecondary,
    fontSize: font.sm,
    fontWeight: fontWeight.strong,
    marginBottom: spacing.md,
  },
  detailTitle: {
    color: colors.textPrimary,
    fontSize: font.title,
    fontWeight: fontWeight.strong,
    lineHeight: lineHeight.title,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  detailSection: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.sm,
    borderWidth: 1,
    marginTop: spacing.xl,
    padding: spacing.section,
  },
  detailLabel: {
    color: colors.textSecondary,
    fontSize: font.xs,
    fontWeight: fontWeight.strong,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
  },
  detailDescription: {
    color: colors.textBody,
    fontSize: font.xl,
    lineHeight: lineHeight.detail,
  },
  detailRows: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.sm,
    borderWidth: 1,
    marginTop: spacing.xl,
    overflow: 'hidden',
  },
  infoRow: {
    borderBottomWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.section,
    paddingVertical: spacing.xxl,
  },
  infoLabel: {
    color: colors.textSecondary,
    fontSize: font.md,
    fontWeight: fontWeight.strong,
  },
  infoValue: {
    color: colors.textPrimary,
    flexShrink: 1,
    fontSize: font.md,
    fontWeight: fontWeight.strong,
    textAlign: 'right',
  },
});
