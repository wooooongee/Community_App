import { darkTheme, spacing, typography } from "@/constants/theme";
import React, { type ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
} from "react-native";

interface ListItemProps extends PressableProps {
  title: string;
  icon?: ReactNode;
}

const ListItem = ({ title, icon = null, ...props }: ListItemProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressedContainer,
      ]}
      {...props}
    >
      {icon}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.md,
    minHeight: 56,
    backgroundColor: darkTheme.bg.secondary,
    borderColor: darkTheme.border.default,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  pressedContainer: {
    backgroundColor: darkTheme.bg.tertiary,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.medium,
    color: darkTheme.text.primary,
  },
});

export default ListItem;
