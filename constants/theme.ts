// Dark mode base colors
export const darkTheme = {
  // Backgrounds
  bg: {
    primary: '#0D0D0F',      // Main background
    secondary: '#161618',    // Card background
    tertiary: '#1C1C1F',     // Elevated surfaces
  },

  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.7)',
    tertiary: 'rgba(255, 255, 255, 0.5)',
    muted: 'rgba(255, 255, 255, 0.3)',
  },

  // Gradient colors
  gradient: {
    primary: ['#667EEA', '#764BA2'],        // Purple-violet
    secondary: ['#F093FB', '#F5576C'],      // Pink-coral
  },

  // Accent colors
  accent: {
    primary: '#667EEA',      // Purple
    secondary: '#F093FB',    // Pink
    error: '#EF4444',        // Red
  },

  // Border colors
  border: {
    default: 'rgba(255, 255, 255, 0.08)',
    light: 'rgba(255, 255, 255, 0.12)',
  },
};

// Typography
export const typography = {
  size: {
    sm: 13,
    base: 15,
    md: 17,
    xl: 24,
  },
  weight: {
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  letterSpacing: {
    tight: -0.5,
  },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};

// Border radius
export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

// Shadow/Glow effects
export const glow = {
  accent: {
    shadowColor: '#667EEA',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
};

