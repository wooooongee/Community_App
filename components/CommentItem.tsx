import { darkTheme, spacing, typography } from "@/constants/theme";
import useAuth from "@/hooks/queries/useAuth";
import useDeleteComment from "@/hooks/queries/useDeleteComment";
import type { Comment } from "@/types";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import InputField from "./InputField";
import Profile from "./Profile";

interface CommentItemProps {
  comment: Comment;
  parentCommentId?: number | null;
  onReply?: () => void;
  onCancelReply?: () => void;
  isReply?: boolean;
}

const CommentItem = ({
  comment,
  parentCommentId,
  onReply,
  onCancelReply,
  isReply = false,
}: CommentItemProps) => {
  const { auth } = useAuth();
  const { t } = useTranslation();
  const { showActionSheetWithOptions } = useActionSheet();
  const deleteComment = useDeleteComment();
  const isOwnComment = !comment.isDeleted && auth.id === comment.user.id;

  const getCommentBackground = () => {
    if (parentCommentId === comment.id) {
      return darkTheme.bg.primary;
    }
    if (isReply) {
      return darkTheme.bg.tertiary;
    }
    return darkTheme.bg.secondary;
  };

  const handlePressOption = () => {
    const options = [t("Delete"), t("Cancel")];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case destructiveButtonIndex:
            deleteComment.mutate(comment.id);
            break;
          case cancelButtonIndex:
            break;
          default:
            break;
        }
      }
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: getCommentBackground() }]}
    >
      <View style={styles.profileContainer}>
        {isReply && (
          <MaterialCommunityIcons
            name="arrow-right-bottom"
            size={24}
            color={darkTheme.text.tertiary}
          />
        )}
        <Profile
          userId={comment.isDeleted ? undefined : comment.user.id}
          imageUri={comment.isDeleted ? "" : (isOwnComment ? auth.imageUri : comment.user.imageUri)}
          avatarConfig={comment.isDeleted ? undefined : (isOwnComment ? auth.avatarConfig : comment.user.avatarConfig)}
          nickname={comment.isDeleted ? t("(Deleted)") : comment.user.nickname}
          createdAt={comment.createdAt}
          onPress={() => {
            if (!comment.isDeleted) {
              router.push(`/profile/${comment.user.id}`);
            }
          }}
          option={
            auth.id === comment.user.id &&
            !comment.isDeleted && (
              <Ionicons
                name="ellipsis-vertical"
                size={24}
                color={darkTheme.text.secondary}
                onPress={handlePressOption}
              />
            )
          }
        />
      </View>
      <InputField
        editable={false}
        value={
          comment.isDeleted
            ? t("This comment has been deleted.")
            : comment.content
        }
      />
      {!comment.isDeleted && !isReply && (
        <View style={styles.replyButtonContainer}>
          <Pressable onPress={onReply}>
            <Text style={styles.replyButton}>{t("Reply")}</Text>
          </Pressable>
          {parentCommentId === comment.id && (
            <Pressable onPress={onCancelReply}>
              <Text style={styles.cancelButton}>{t("Cancel")}</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkTheme.bg.secondary,
    padding: spacing.lg,
    gap: spacing.md,
    borderColor: darkTheme.border.default,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  replyButtonContainer: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center",
  },
  replyButton: {
    fontWeight: typography.weight.bold,
    color: darkTheme.accent.primary,
    fontSize: typography.size.sm,
  },
  cancelButton: {
    fontWeight: typography.weight.bold,
    color: darkTheme.text.tertiary,
    fontSize: typography.size.sm,
  },
});

export default CommentItem;
