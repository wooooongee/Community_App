/**
 * GradientButton - Button with gradient background
 */

import React from 'react';
import { StyleSheet, Text, Pressable, PressableProps, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { darkTheme, typography, radius, spacing, glow } from '@/constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface GradientButtonProps extends Omit<PressableProps, 'style'> {
  label: string;
  gradient?: string[];
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  fullWidth?: boolean;
  glowColor?: 'accent' | 'pink' | 'cyan';
}

export function GradientButton({
  label,
  gradient = darkTheme.gradient.primary,
  size = 'md',
  style,
  fullWidth = false,
  glowColor = 'accent',
  onPress,
  disabled,
  ...props
}: GradientButtonProps) {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 200 });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const heights = {
    sm: 36,
    md: 44,
    lg: 52,
  };

  return (
    <AnimatedPressable
      style={[
        styles.container,
        { height: heights[size] },
        fullWidth && styles.fullWidth,
        !disabled && glow[glowColor],
        disabled && styles.disabled,
        animatedStyle,
        style,
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      <LinearGradient
        colors={disabled ? [darkTheme.bg.tertiary, darkTheme.bg.tertiary] : gradient as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={[styles.text, disabled && styles.disabledText]}>{label}</Text>
      </LinearGradient>
    </AnimatedPressable>
  );
}

// Glass style button (outline with glass effect)
export function GlassButton({
  label,
  size = 'md',
  style,
  fullWidth = false,
  onPress,
  disabled,
  ...props
}: Omit<GradientButtonProps, 'gradient' | 'glowColor'>) {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 200 });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const heights = {
    sm: 36,
    md: 44,
    lg: 52,
  };

  return (
    <AnimatedPressable
      style={[
        styles.glassContainer,
        { height: heights[size] },
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        animatedStyle,
        style,
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      <Text style={[styles.glassText, disabled && styles.disabledText]}>{label}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  text: {
    color: darkTheme.text.primary,
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: darkTheme.text.tertiary,
  },
  glassContainer: {
    borderRadius: radius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  glassText: {
    color: darkTheme.text.primary,
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
  },
});
