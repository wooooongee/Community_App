import { darkTheme, radius, spacing, typography } from "@/constants/theme";
import type { PostVoteOption } from "@/types";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface VoteOptionProps {
  option: PostVoteOption;
  totalCount: number;
  isVoted: boolean;
  isSelected: boolean;
  onSelectOption: () => void;
}

function VoteOption({
  option,
  totalCount,
  isSelected,
  isVoted,
  onSelectOption,
}: VoteOptionProps) {
  const percent = option.userVotes.length
    ? Math.floor((option.userVotes.length / totalCount) * 100)
    : 0;

  return (
    <>
      {isVoted ? (
        <View style={styles.votedContainer}>
          <View style={[styles.percent, { width: `${percent}%` }]} />
          <Text style={styles.content}>{option.content}</Text>
          <Text style={styles.percentText}>
            {percent}% ({option.userVotes.length})
          </Text>
        </View>
      ) : (
        <Pressable
          onPress={onSelectOption}
          style={isSelected ? styles.selectedContainer : styles.container}
        >
          <Text style={styles.content}>{option.content}</Text>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: radius.md,
    backgroundColor: darkTheme.bg.secondary,
    borderWidth: 1,
    borderColor: darkTheme.border.default,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
    alignItems: "center",
  },
  selectedContainer: {
    height: 48,
    borderRadius: radius.md,
    backgroundColor: darkTheme.bg.secondary,
    borderWidth: 2,
    borderColor: darkTheme.accent.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
    alignItems: "center",
  },
  content: {
    marginLeft: spacing.md,
    color: darkTheme.text.primary,
    fontSize: typography.size.sm,
  },
  votedContainer: {
    height: 48,
    borderRadius: radius.md,
    backgroundColor: "rgba(102, 126, 234, 0.3)",
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
    alignItems: "center",
  },
  percent: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 48,
    backgroundColor: "rgba(102, 126, 234, 0.5)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  percentText: {
    marginRight: spacing.md,
    fontWeight: typography.weight.medium,
    color: darkTheme.text.primary,
    fontSize: typography.size.sm,
  },
});

export default VoteOption;
