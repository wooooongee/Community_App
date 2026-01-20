import { darkTheme, radius, spacing, typography } from "@/constants/theme";
import useAuth from "@/hooks/queries/useAuth";
import useDeletePost from "@/hooks/queries/useDeletePost";
import useLikePost from "@/hooks/queries/useLikePost";
import type { Post } from "@/types";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Share, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import ImagePreviewList from "./ImagePreviewList";
import Profile from "./Profile";
import Vote from "./Vote";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface FeedItemProps {
  post: Post;
  isDetail?: boolean;
}

function FeedItem({ post, isDetail = false }: FeedItemProps) {
  const { auth } = useAuth();
  const { t } = useTranslation();
  const likeUsers = post.likes?.map((like) => Number(like.userId));
  const isOwnPost = auth.id === post.author.id;
  const isLiked = likeUsers?.includes(Number(auth.id));
  const { showActionSheetWithOptions } = useActionSheet();
  const deletePost = useDeletePost();
  const likePost = useLikePost();

  // Animation values
  const cardScale = useSharedValue(1);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const handlePressIn = () => {
    if (!isDetail) {
      cardScale.value = withSpring(0.98, { damping: 15, stiffness: 200 });
    }
  };

  const handlePressOut = () => {
    cardScale.value = withSpring(1, { damping: 15, stiffness: 200 });
  };

  const handlePressOption = () => {
    const options = [t("Delete"), t("Edit"), t("Cancel")];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      { options, cancelButtonIndex, destructiveButtonIndex },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case destructiveButtonIndex:
            deletePost.mutate(post.id, {
              onSuccess: () => isDetail && router.back(),
            });
            break;
          case 1:
            router.push(`/post/update/${post.id}`);
            break;
          case cancelButtonIndex:
            break;
          default:
            break;
        }
      }
    );
  };

  const handlePressFeed = () => {
    if (!isDetail) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      router.push(`/post/${post.id}`);
    }
  };

  const handlePressLike = () => {
    if (!auth.id) {
      router.push("/auth");
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    likePost.mutate(post.id);
  };

  const handlePressShare = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    try {
      await Share.share({
        title: post.title,
        message: `${post.title}\n\n${post.description}`,
        // URL이 있다면 추가 가능: url: `https://yourapp.com/post/${post.id}`
      });
    } catch (error) {
      console.log("Share error:", error);
    }
  };

  const ContainerComponent = isDetail ? Animated.View : AnimatedPressable;

  return (
    <ContainerComponent
      style={[styles.container, cardAnimatedStyle]}
      onPress={handlePressFeed}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      entering={FadeIn.duration(300)}
    >
      {/* Glass card background */}
      <View style={styles.glassBackground}>
        {/* Subtle gradient accent on top border */}
        <LinearGradient
          colors={[
            "rgba(102, 126, 234, 0.3)",
            "rgba(240, 147, 251, 0.3)",
            "transparent",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.topGradient}
        />

        <View style={styles.contentContainer}>
          <Profile
            userId={post.author.id}
            imageUri={isOwnPost ? auth.imageUri : post.author.imageUri}
            avatarConfig={isOwnPost ? auth.avatarConfig : post.author.avatarConfig}
            nickname={post.author.nickname}
            createdAt={post.createdAt}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.push(`/profile/${post.author.id}`);
            }}
            option={
              auth.id === post.author.id && (
                <Ionicons
                  name="ellipsis-horizontal"
                  size={20}
                  color={darkTheme.text.secondary}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    handlePressOption();
                  }}
                />
              )
            }
          />

          <Text style={styles.title}>{post.title}</Text>
          <Text
            numberOfLines={isDetail ? undefined : 3}
            style={styles.description}
          >
            {post.description}
          </Text>

          <ImagePreviewList imageUris={post.imageUris} />

          {!isDetail && post.hasVote && (
            <View style={styles.votePreview}>
              <LinearGradient
                colors={darkTheme.gradient.primary as any}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.voteGradient}
              >
                <MaterialCommunityIcons
                  name="vote"
                  size={18}
                  color={darkTheme.text.primary}
                />
                <Text style={styles.voteText}>{t("Vote")}</Text>
              </LinearGradient>
              <Text style={styles.voteCountText}>
                {t("{{count}} participants", { count: post.voteCount })}
              </Text>
            </View>
          )}

          {isDetail && post.hasVote && (
            <Vote
              postId={post.id}
              postVotes={post.votes ?? []}
              voteCount={post.voteCount}
            />
          )}
        </View>

        {/* Action bar */}
        <View style={styles.menuContainer}>
          <Pressable style={styles.menu} onPress={handlePressLike}>
            <Octicons
              name={isLiked ? "heart-fill" : "heart"}
              size={18}
              color={
                isLiked ? darkTheme.accent.secondary : darkTheme.text.secondary
              }
            />
            <Text style={[styles.menuText, isLiked && styles.likedText]}>
              {post.likes.length || ""}
            </Text>
          </Pressable>

          <Pressable style={styles.menu} onPress={handlePressFeed}>
            <Ionicons
              name="chatbubble-outline"
              size={18}
              color={darkTheme.text.secondary}
            />
            <Text style={styles.menuText}>{post.commentCount || ""}</Text>
          </Pressable>

          <Pressable style={styles.menu}>
            <Ionicons
              name="eye-outline"
              size={18}
              color={darkTheme.text.secondary}
            />
            <Text style={styles.menuText}>{post.viewCount}</Text>
          </Pressable>

          <Pressable style={styles.menu} onPress={handlePressShare}>
            <Ionicons
              name="share-outline"
              size={18}
              color={darkTheme.text.secondary}
            />
          </Pressable>
        </View>
      </View>
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  glassBackground: {
    backgroundColor: darkTheme.bg.secondary,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: darkTheme.border.default,
    overflow: "hidden",
  },
  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  contentContainer: {
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.size.md,
    color: darkTheme.text.primary,
    fontWeight: typography.weight.semibold,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    letterSpacing: typography.letterSpacing.tight,
  },
  description: {
    fontSize: typography.size.base,
    color: darkTheme.text.secondary,
    lineHeight: typography.size.base * 1.5,
    marginBottom: spacing.md,
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: darkTheme.border.default,
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
    minWidth: 50,
  },
  menuText: {
    fontSize: typography.size.sm,
    color: darkTheme.text.tertiary,
    fontWeight: typography.weight.medium,
    minWidth: 16,
  },
  likedText: {
    color: darkTheme.accent.secondary,
    fontWeight: typography.weight.semibold,
  },
  votePreview: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  voteGradient: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
  },
  voteText: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: darkTheme.text.primary,
  },
  voteCountText: {
    fontSize: typography.size.sm,
    color: darkTheme.text.tertiary,
  },
});

export default FeedItem;
