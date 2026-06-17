export type BadgeColors = {
  backgroundColor: string;
  borderColor: string;
  color: string;
};

export const theme = {
  colors: {
    background: '#F6F7F9',
    surface: '#FFFFFF',
    surfaceMuted: '#F8FAFC',
    surfaceSoft: '#F1F5F9',
    border: '#E5E7EB',
    borderSoft: '#EEF2F7',
    borderStrong: '#CBD5E1',
    textPrimary: '#111827',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    textBody: '#334155',
    textDescription: '#475569',
    textPill: '#374151',
    primary: '#2563EB',
    primarySoft: '#93C5FD',
    danger: '#991B1B',
    shadow: '#0F172A',
  },
  spacing: {
    xxs: 2,
    xs: 4,
    sm: 6,
    md: 8,
    lg: 10,
    xl: 12,
    xxl: 14,
    screen: 16,
    section: 18,
    header: 20,
    state: 24,
    bottom: 28,
  },
  radius: {
    sm: 8,
    pill: 999,
  },
  font: {
    xxs: 11,
    xs: 12,
    sm: 13,
    md: 14,
    lg: 15,
    xl: 16,
    xxl: 17,
    title: 24,
    display: 30,
  },
  lineHeight: {
    sm: 20,
    cardTitle: 21,
    body: 22,
    detail: 24,
    title: 31,
  },
  fontWeight: {
    strong: '800',
  },
} as const;

const neutralBadgeColors: BadgeColors = {
  backgroundColor: theme.colors.surfaceSoft,
  borderColor: theme.colors.borderStrong,
  color: theme.colors.textBody,
};

const priorityBadgeColors: Record<string, BadgeColors> = {
  HIGH: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FCA5A5',
    color: '#7F1D1D',
  },
  MEDIUM: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FCD34D',
    color: '#78350F',
  },
  LOW: {
    backgroundColor: '#E0F2FE',
    borderColor: '#7DD3FC',
    color: '#075985',
  },
};

const statusBadgeColors: Record<string, BadgeColors> = {
  DONE: {
    backgroundColor: '#DCFCE7',
    borderColor: '#86EFAC',
    color: '#14532D',
  },
  IN_PROGRESS: {
    backgroundColor: '#DBEAFE',
    borderColor: theme.colors.primarySoft,
    color: '#1E3A8A',
  },
  PENDING: {
    backgroundColor: '#F3E8FF',
    borderColor: '#D8B4FE',
    color: '#581C87',
  },
};

export function getPriorityColors(code: string): BadgeColors {
  return priorityBadgeColors[code] ?? getNeutralColors();
}

export function getStatusColors(code: string): BadgeColors {
  return statusBadgeColors[code] ?? getNeutralColors();
}

export function getNeutralColors(): BadgeColors {
  return neutralBadgeColors;
}
