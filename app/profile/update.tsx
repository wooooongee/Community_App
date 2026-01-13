import CustomButton from "@/components/CustomButton";
import DiceBearAvatar, {
  defaultAvatarConfig,
  generateAvatarSeed,
} from "@/components/DiceBearAvatar";
import FixedBottomCTA from "@/components/FixedBottomCTA";
import IntroduceInput from "@/components/IntroduceInput";
import NicknameInput from "@/components/NicknameInput";
import { darkTheme, spacing } from "@/constants/theme";
import useAuth from "@/hooks/queries/useAuth";
import { router } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

type FormValues = {
  nickname: string;
  introduce: string;
};

export default function ProfileUpdateScreen() {
  const { t } = useTranslation();
  const { auth, profileMutation } = useAuth();
  const profileForm = useForm<FormValues>({
    defaultValues: {
      nickname: auth.nickname,
      introduce: auth.introduce,
    },
  });

  const onSubmit = (formValues: FormValues) => {
    profileMutation.mutate(formValues, {
      onSuccess: () =>
        Toast.show({
          type: "success",
          text1: t("Saved successfully"),
        }),
    });
  };

  return (
    <FormProvider {...profileForm}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <DiceBearAvatar
              config={
                auth.avatarConfig ?? {
                  ...defaultAvatarConfig,
                  seed: generateAvatarSeed(auth.id || auth.nickname),
                }
              }
              size={148}
            />
          </View>
          <CustomButton
            size="medium"
            variant="outlined"
            label={t("Change Avatar")}
            style={{ position: "absolute", right: 0, bottom: 0 }}
            onPress={() => router.push("/profile/avatar")}
          />
        </View>
        <View style={styles.inputContainer}>
          <NicknameInput />
          <IntroduceInput />
        </View>
      </View>
      <FixedBottomCTA
        label={t("Save")}
        onPress={profileForm.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: spacing.lg,
    backgroundColor: darkTheme.bg.primary,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: spacing.lg,
    position: "relative",
  },
  avatar: {
    width: 154,
    height: 154,
    borderRadius: 77,
    borderWidth: 3,
    borderColor: darkTheme.border.default,
    backgroundColor: darkTheme.bg.secondary,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    gap: spacing.lg,
  },
});
