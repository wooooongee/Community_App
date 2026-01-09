import CustomButton from "@/components/CustomButton";
import DescriptionInput from "@/components/DescriptionInput";
import ImagePreviewList from "@/components/ImagePreviewList";
import PostWriteFooter from "@/components/PostWriteFooter";
import TitleInput from "@/components/TitleInput";
import VoteAttached from "@/components/VoteAttached";
import VoteModal from "@/components/VoteModal";
import { darkTheme, spacing } from "@/constants/theme";
import { useCreatePost } from "@/hooks/queries/useCreatePost";
import type { ImageUri, VoteOption } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type FormValues = {
  title: string;
  description: string;
  imageUris: ImageUri[];
  isVoteOpen: boolean;
  isVoteAttached: boolean;
  voteOptions: VoteOption[];
};

export default function PostWriteScreen() {
  const createPost = useCreatePost();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const postForm = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      imageUris: [],
      isVoteOpen: false,
      isVoteAttached: false,
      voteOptions: [{ displayPriority: 0, content: "" }],
    },
  });

  const onSubmit = (formValues: FormValues) => {
    createPost.mutate(formValues);
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
          <Text style={styles.title}>{t("Write Post")}</Text>
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
          <ImagePreviewList imageUris={postForm.watch().imageUris} />
        </KeyboardAwareScrollView>
        <PostWriteFooter />
      </View>
      <VoteModal />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: darkTheme.bg.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: darkTheme.bg.primary,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
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
