/**
 * Glassmorphism Dark Theme
 * Inspired by Twitter/X with vibrant gradients
 */

// Dark mode base colors
export const darkTheme = {
  // Backgrounds - Deep dark with subtle blue tint
  bg: {
    primary: '#0D0D0F',      // Main background
    secondary: '#161618',    // Card background
    tertiary: '#1C1C1F',     // Elevated surfaces
    glass: 'rgba(255, 255, 255, 0.05)',  // Glass effect
    glassBorder: 'rgba(255, 255, 255, 0.1)',
  },

  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.7)',
    tertiary: 'rgba(255, 255, 255, 0.5)',
    muted: 'rgba(255, 255, 255, 0.3)',
  },

  // Gradient colors - Vibrant and eye-catching
  gradient: {
    primary: ['#667EEA', '#764BA2'],        // Purple-violet
    secondary: ['#F093FB', '#F5576C'],      // Pink-coral
    accent: ['#4FACFE', '#00F2FE'],         // Cyan-aqua
    sunset: ['#FA709A', '#FEE140'],         // Pink-yellow
    aurora: ['#667EEA', '#764BA2', '#F093FB'], // Multi-color
  },

  // Accent colors
  accent: {
    primary: '#667EEA',      // Purple
    secondary: '#F093FB',    // Pink
    cyan: '#4FACFE',         // Cyan
    success: '#10B981',      // Green
    warning: '#F59E0B',      // Amber
    error: '#EF4444',        // Red
    like: '#F91880',         // Twitter pink
  },

  // Border colors
  border: {
    default: 'rgba(255, 255, 255, 0.08)',
    light: 'rgba(255, 255, 255, 0.12)',
    gradient: 'rgba(255, 255, 255, 0.15)',
  },
};

// Typography - Clean and modern
export const typography = {
  size: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    '2xl': 32,
    '3xl': 40,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 48,
};

// Border radius
export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
};

// Glass effect styles (for StyleSheet)
export const glassStyle = {
  light: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  medium: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  strong: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
};

// Shadow/Glow effects
export const glow = {
  accent: {
    shadowColor: '#667EEA',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  pink: {
    shadowColor: '#F093FB',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  cyan: {
    shadowColor: '#4FACFE',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
};

// Animation configs
export const animation = {
  spring: {
    damping: 15,
    stiffness: 150,
  },
  timing: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
};

