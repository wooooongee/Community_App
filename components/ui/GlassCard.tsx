/**
 * GlassCard - Glassmorphism card component
 * Creates frosted glass effect with blur
 */

import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { darkTheme, radius, spacing } from '@/constants/theme';

interface GlassCardProps {
  children: ReactNode;
  intensity?: 'light' | 'medium' | 'strong';
  style?: ViewStyle;
  blurIntensity?: number;
  noPadding?: boolean;
}

export function GlassCard({
  children,
  intensity = 'medium',
  style,
  blurIntensity = 20,
  noPadding = false,
}: GlassCardProps) {
  const bgOpacity = {
    light: 0.03,
    medium: 0.06,
    strong: 0.1,
  };

  const borderOpacity = {
    light: 0.08,
    medium: 0.12,
    strong: 0.18,
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: `rgba(255, 255, 255, ${bgOpacity[intensity]})`,
          borderColor: `rgba(255, 255, 255, ${borderOpacity[intensity]})`,
        },
        !noPadding && styles.padding,
        style,
      ]}
    >
      {children}
    </View>
  );
}

// Alternative without blur for better performance
export function GlassCardSimple({
  children,
  style,
  noPadding = false,
}: Omit<GlassCardProps, 'intensity' | 'blurIntensity'>) {
  return (
    <View style={[styles.simpleContainer, !noPadding && styles.padding, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  simpleContainer: {
    backgroundColor: darkTheme.bg.secondary,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: darkTheme.border.default,
  },
  padding: {
    padding: spacing.lg,
  },
});
