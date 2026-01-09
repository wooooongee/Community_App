import { darkTheme, radius, typography, spacing, glow } from "@/constants/theme";
import { Text } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CustomButtonProps extends PressableProps {
  label: string;
  size?: "medium" | "large";
  variant?: "standard" | "filled" | "outlined" | "gradient";
  style?: StyleProp<ViewStyle>;
  enableHaptics?: boolean;
}

function CustomButton({
  label,
  size = "large",
  variant = "gradient",
  style = null,
  enableHaptics = true,
  onPress,
  ...props
}: CustomButtonProps) {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 15, stiffness: 200 });
    if (enableHaptics) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Gradient button (default)
  if (variant === "gradient" || variant === "filled") {
    return (
      <AnimatedPressable
        style={[
          styles.container,
          styles[size],
          props.disabled && styles.disabled,
          !props.disabled && glow.accent,
          animatedStyle,
          style,
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        {...props}
      >
        <LinearGradient
          colors={props.disabled ? [darkTheme.bg.tertiary, darkTheme.bg.tertiary] : darkTheme.gradient.primary as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientFill}
        >
          <Text style={[styles.filledText, props.disabled && styles.disabledText]}>{label}</Text>
        </LinearGradient>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      style={[
        styles.container,
        styles[size],
        styles[variant],
        props.disabled && styles.disabled,
        animatedStyle,
        style,
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      {...props}
    >
      <Text style={[styles[`${variant}Text`], props.disabled && styles.disabledText]}>{label}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
    overflow: 'hidden',
  },
  large: {
    width: "100%",
    height: 48,
  },
  medium: {
    height: 40,
    alignSelf: "center",
    paddingHorizontal: spacing.lg,
  },
  gradientFill: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  standard: {
    backgroundColor: 'transparent',
  },
  outlined: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  disabled: {
    opacity: 0.5,
  },
  standardText: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
    color: darkTheme.accent.primary,
  },
  filledText: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
    color: darkTheme.text.primary,
  },
  outlinedText: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
    color: darkTheme.text.primary,
  },
  disabledText: {
    color: darkTheme.text.muted,
  },
});

export default CustomButton;
