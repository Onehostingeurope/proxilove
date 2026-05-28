export const Colors = {
  background: '#0A0F24',
  backgroundDeep: '#070C1A',
  surface: '#131315',
  surfaceCard: '#1C1B1D',
  surfaceHigh: '#2A2A2C',
  primary: '#00F0FF',
  coral: '#FF5A5F',
  green: '#00E676',
  amber: '#FFB300',
  text: '#E5E1E4',
  textMuted: '#C7C5CD',
  textFaint: '#909097',
  border: 'rgba(255,255,255,0.08)',
  borderCyan: 'rgba(0,240,255,0.2)',
  glassBg: 'rgba(10,15,36,0.7)',
} as const

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const

export const Radius = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  full: 999,
} as const

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 22,
  xxl: 28,
  display: 36,
} as const

export const Shadow = {
  cyan: {
    shadowColor: '#00F0FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  coral: {
    shadowColor: '#FF5A5F',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  green: {
    shadowColor: '#00E676',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
} as const
