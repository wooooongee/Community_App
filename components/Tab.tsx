import { darkTheme, spacing, typography } from "@/constants/theme";
import React, { type ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface TabProps {
  isActive: boolean;
  onPress?: () => void;
  children: ReactNode;
}

const Tab = ({ isActive, onPress, children }: TabProps) => {
  return (
    <Pressable
      style={[styles.container, isActive && styles.activeContainer]}
      onPress={onPress}
    >
      <Text style={[styles.text, isActive && styles.activeText]}>
        {children}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 42,
    flex: 1,
    paddingVertical: spacing.sm,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: darkTheme.border.default,
    borderBottomWidth: 1,
  },
  activeContainer: {
    borderBottomColor: darkTheme.accent.primary,
    borderBottomWidth: 2,
  },
  text: {
    fontSize: typography.size.sm,
    color: darkTheme.text.tertiary,
  },
  activeText: {
    color: darkTheme.text.primary,
    fontWeight: typography.weight.bold,
  },
});

export default Tab;
