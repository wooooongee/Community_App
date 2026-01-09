import { darkTheme, spacing, radius, typography } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View, type TextInputProps } from "react-native";

interface SearchInputProps extends TextInputProps {
  onSubmit?: () => void;
}

const SearchInput = ({ onSubmit, ...props }: SearchInputProps) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color={darkTheme.text.tertiary} />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholderTextColor={darkTheme.text.tertiary}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    paddingHorizontal: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  input: {
    flex: 1,
    fontSize: typography.size.base,
    paddingVertical: 0,
    color: darkTheme.text.primary,
  },
});

export default SearchInput;
