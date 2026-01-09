import { darkTheme, radius, typography, spacing } from "@/constants/theme";
import React, { ForwardedRef, forwardRef, ReactNode, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

interface InputFieldProps extends TextInputProps {
  label?: string;
  variant?: "filled" | "standard" | "outlined";
  error?: string;
  rightChild?: ReactNode;
}

function InputField(
  {
    label,
    variant = "filled",
    error = "",
    rightChild = null,
    ...props
  }: InputFieldProps,
  ref?: ForwardedRef<TextInput>
) {
  const [isFocused, setIsFocused] = useState(false);
  const borderOpacity = useSharedValue(0.08);
  const scale = useSharedValue(1);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    borderOpacity.value = withTiming(0.25, {
      duration: 150,
      easing: Easing.out(Easing.cubic),
    });
    scale.value = withTiming(1.01, {
      duration: 150,
      easing: Easing.out(Easing.cubic),
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    props.onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    borderOpacity.value = withTiming(0.08, {
      duration: 150,
      easing: Easing.out(Easing.cubic),
    });
    scale.value = withTiming(1, {
      duration: 150,
      easing: Easing.out(Easing.cubic),
    });
    props.onBlur?.(e);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    borderColor: `rgba(102, 126, 234, ${borderOpacity.value})`,
  }));

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <Animated.View
        style={[
          styles.container,
          props.multiline && styles.multiLine,
          Boolean(error) && styles.inputError,
          isFocused && styles.focused,
          animatedStyle,
        ]}
      >
        <TextInput
          ref={ref}
          placeholderTextColor={darkTheme.text.muted}
          style={[styles.input, props.multiline && styles.multiLineInput]}
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {rightChild}
      </Animated.View>
      {Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  label: {
    fontSize: typography.size.sm,
    color: darkTheme.text.secondary,
    marginBottom: spacing.sm,
    fontWeight: typography.weight.medium,
  },
  focused: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  input: {
    fontSize: typography.size.md,
    padding: 0,
    flex: 1,
    color: darkTheme.text.primary,
  },
  multiLineInput: {
    textAlignVertical: 'top',
    paddingTop: 0,
  },
  error: {
    fontSize: typography.size.sm,
    marginTop: spacing.sm,
    color: darkTheme.accent.error,
    fontWeight: typography.weight.medium,
  },
  inputError: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: darkTheme.accent.error,
  },
  multiLine: {
    alignItems: "flex-start",
    paddingVertical: spacing.md,
    minHeight: 160,
  },
});

export default forwardRef(InputField);
