import AuthRoute from "@/components/AuthRoute";
import CommentItem from "@/components/CommentItem";
import FeedItem from "@/components/FeedItem";
import InputField from "@/components/InputField";
import { darkTheme, spacing, typography, radius } from "@/constants/theme";
import useCreateComment from "@/hooks/queries/useCreateComment";
import useGetPost from "@/hooks/queries/useGetPost";
import useKeyboard from "@/hooks/queries/useKeyboard";
import { useLocalSearchParams } from "expo-router";
import { Fragment, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data: post, isPending, isError } = useGetPost(Number(id));
  const createComment = useCreateComment();
  const [content, setContent] = useState("");
  const scrollRef = useRef<ScrollView | null>(null);
  const inputRef = useRef<TextInput | null>(null);
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);
  const { isKeyboardVisble } = useKeyboard();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation(); 

  if (isPending || isError) {
    return <></>;
  }

  const handleReply = (commentId: number) => {
    setParentCommentId(commentId);
    inputRef.current?.focus();
  };

  const handleCancelReply = () => {
    setParentCommentId(null);
    Keyboard.dismiss();
  };

  const handleSubmitComment = () => {
    const commentData = {
      postId: post.id,
      content: content,
    };
    if (parentCommentId) {
      createComment.mutate({ ...commentData, parentCommentId });
      setContent("");
      handleCancelReply();
      return;
    }

    createComment.mutate(commentData);
    setContent("");

    // 새 댓글 추가시 자동으로 아래 스크롤
    setTimeout(() => {
      scrollRef.current?.scrollToEnd();
    }, 500);
  };

  return (
    <AuthRoute>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          contentContainerStyle={styles.awareScrollViewContainer}
          behavior="height"
          keyboardVerticalOffset={
            Platform.OS === "ios" || isKeyboardVisble ? 115 : insets.bottom
          }
          //   keyboardVerticalOffset={115}
        >
          <ScrollView
            ref={scrollRef}
            style={{ flex: 1, marginBottom: 75 }}
            contentContainerStyle={styles.scrollViewContainer}
          >
            <View style={{ marginTop: 12 }}>
              <FeedItem post={post} isDetail />
              <Text style={styles.commentCount}>
                {t("{{count}} comments", { count: post.commentCount })} 
              </Text>
            </View>
            {post.comments?.map((comment) => (
              <Fragment key={comment.id}>
                <CommentItem
                  parentCommentId={parentCommentId}
                  onReply={() => handleReply(comment.id)}
                  onCancelReply={handleCancelReply}
                  comment={comment}
                />
                {comment.replies.map((reply) => (
                  <CommentItem key={reply.id} comment={reply} isReply />
                ))}
              </Fragment>
            ))}
          </ScrollView>

          <View style={styles.commentInputContainer}>
            <InputField
              ref={inputRef}
              value={content}
              returnKeyType="send"
              onSubmitEditing={handleSubmitComment}
              onChangeText={(text) => setContent(text)}
              placeholder={
                parentCommentId 
                  ? t("Writing a reply...") 
                  : t("Leave a comment") 
              }
              rightChild={
                <Pressable
                  disabled={!content}
                  onPress={handleSubmitComment}
                >
                  <LinearGradient
                    colors={content ? darkTheme.gradient.primary as any : [darkTheme.bg.tertiary, darkTheme.bg.tertiary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.inputButtonContainer}
                  >
                    <Text style={[styles.inputButtonText, !content && styles.inputButtonDisabled]}>{t("Post")}</Text>
                  </LinearGradient>
                </Pressable>
              }
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.bg.primary,
  },
  awareScrollViewContainer: {
    backgroundColor: darkTheme.bg.primary,
    flexGrow: 1,
  },
  scrollViewContainer: {
    backgroundColor: darkTheme.bg.primary,
  },
  commentCount: {
    marginTop: spacing.sm,
    backgroundColor: darkTheme.bg.secondary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
    color: darkTheme.text.primary,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: darkTheme.border.default,
  },
  commentInputContainer: {
    width: "100%",
    borderTopColor: darkTheme.border.default,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: darkTheme.bg.secondary,
    padding: spacing.md,
    bottom: 0,
    position: "absolute",
  },
  inputButtonContainer: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
  },
  inputButtonText: {
    color: darkTheme.text.primary,
    fontWeight: typography.weight.bold,
    fontSize: typography.size.sm,
  },
  inputButtonDisabled: {
    color: darkTheme.text.tertiary,
  },
});
