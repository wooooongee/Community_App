import { darkTheme, spacing, typography, radius } from "@/constants/theme";
import useAuth from "@/hooks/queries/useAuth";
import useCreateVote from "@/hooks/queries/useCreateVote";
import type { PostVote } from "@/types";
import { Feather } from "@expo/vector-icons";
import React, { Fragment, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import VoteOption from "./VoteOption";
import { useTranslation } from "react-i18next"; 

interface VoteProps {
  postId: number;
  postVotes: PostVote[];
  voteCount: number;
}

const Vote = ({ postId, postVotes, voteCount }: VoteProps) => {
  const { auth } = useAuth();
  const { t } = useTranslation(); 
  const [selectedId, setSelectedId] = useState<number>();
  const createVote = useCreateVote();

  const handleVote = () => {
    createVote.mutate({ postId: postId, voteOptionId: Number(selectedId) });
  };

  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text style={styles.labelTitle}>{t("Vote")}</Text>
        <View style={styles.labelCount}>
          <Feather name="user" size={14} color={darkTheme.text.secondary} />
          <Text style={styles.labelCountText}>{t("{{count}} participants", { count: voteCount })} </Text>
        </View>
      </View>
      {postVotes.map((vote) => {
        const voteUserIds = vote.options.flatMap((option) =>
          option.userVotes.map((userVote) => userVote.userId)
        );
        const isVoted = voteUserIds.includes(Number(auth.id));

        return (
          <Fragment key={vote.id}>
            {vote.options.map((option) => {
              return (
                <VoteOption
                  key={option.id}
                  isVoted={isVoted}
                  isSelected={option.id === selectedId}
                  onSelectOption={() => setSelectedId(Number(option.id))}
                  option={option}
                  totalCount={voteCount}
                />
              );
            })}
            {!isVoted && (
              <CustomButton
                label={t("Vote Now")} 
                disabled={!selectedId}
                onPress={handleVote}
              />
            )}
          </Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: darkTheme.border.default,
    borderRadius: radius.md,
    padding: spacing.lg,
    gap: spacing.md,
    backgroundColor: darkTheme.bg.tertiary,
  },
  label: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  labelTitle: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    color: darkTheme.accent.primary,
  },
  labelCount: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  labelCountText: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    color: darkTheme.text.secondary,
  },
});

export default Vote;
