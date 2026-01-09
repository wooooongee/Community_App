import CustomButton from "@/components/CustomButton";
import DescriptionInput from "@/components/DescriptionInput";
import TitleInput from "@/components/TitleInput";
import VoteAttached from "@/components/VoteAttached";
import { darkTheme, spacing } from "@/constants/theme";
import useGetPost from "@/hooks/queries/useGetPost";
import useUpdatePost from "@/hooks/queries/useUpdatePost";
import type { ImageUri } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type FormValues = {
  title: string;
  description: string;
  imageUris: ImageUri[];
  isVoteAttached: boolean;
};

export default function PostUpdateScreen() {
  const { id } = useLocalSearchParams();
  const { data: post } = useGetPost(Number(id));
  const updatePost = useUpdatePost();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const postForm = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      imageUris: [],
      isVoteAttached: false,
    },
  });

  useEffect(() => {
    if (post) {
      postForm.reset({
        title: post.title,
        description: post.description,
        imageUris: post.imageUris,
        isVoteAttached: post.hasVote,
      });
    }
  }, [post]);

  const onSubmit = (formValues: FormValues) => {
    // 기존에 투표가 있었는데 삭제한 경우 deleteVote: true 전송
    const deleteVote = post?.hasVote && !formValues.isVoteAttached;

    updatePost.mutate(
      {
        id: Number(id),
        body: {
          title: formValues.title,
          description: formValues.description,
          imageUris: formValues.imageUris,
          deleteVote,
        },
      },
      {
        onSuccess: () => router.back(),
      }
    );
  };

  return (
    <FormProvider {...postForm}>
      <View style={styles.wrapper}>
        {/* Custom Header */}
        <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
          <TouchableOpacity
            onPress={() => router.canGoBack() ? router.back() : router.replace("/")}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color={darkTheme.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>{t("Edit Post")}</Text>
          <CustomButton
            label={t("Save")}
            size="medium"
            variant="standard"
            onPress={postForm.handleSubmit(onSubmit)}
          />
        </View>

        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          style={styles.scrollView}
        >
          <TitleInput />
          <DescriptionInput />
          <VoteAttached />
        </KeyboardAwareScrollView>
      </View>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: darkTheme.bg.primary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: darkTheme.bg.primary,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: darkTheme.text.primary,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
});
