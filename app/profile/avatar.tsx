import AvatarEditor from "@/components/AvatarEditor";
import {
  defaultAvatarConfig,
  generateAvatarSeed,
} from "@/components/DiceBearAvatar";
import FixedBottomCTA from "@/components/FixedBottomCTA";
import { darkTheme, spacing, typography } from "@/constants/theme";
import useAuth from "@/hooks/queries/useAuth";
import type { LoreleiAvatarConfig } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function AvatarScreen() {
  const navigation = useNavigation();
  const { auth, profileMutation } = useAuth();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  // 기존 avatarConfig가 있으면 사용, 없으면 사용자 ID 기반 기본 설정
  const initialConfig: LoreleiAvatarConfig = auth?.avatarConfig ?? {
    ...defaultAvatarConfig,
    seed: generateAvatarSeed(auth?.id),
  };

  const [avatarConfig, setAvatarConfig] =
    useState<LoreleiAvatarConfig>(initialConfig);

  const handleSaveAvatar = () => {
    profileMutation.mutate(
      { avatarConfig },
      {
        onSuccess: () =>
          Toast.show({
            type: "success",
            text1: t("Saved successfully"),
          }),
      }
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <>
      <View style={styles.container}>
        {/* Custom Header */}
        <LinearGradient
          colors={darkTheme.gradient.primary as [string, string, ...string[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.headerGradient,
            { paddingTop: insets.top + spacing.sm },
          ]}
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() =>
                router.canGoBack() ? router.back() : router.replace("/")
              }
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Ionicons
                name="chevron-back"
                size={28}
                color={darkTheme.text.primary}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{t("Edit Avatar")}</Text>
            <View style={styles.placeholder} />
          </View>
        </LinearGradient>

        {/* Avatar Editor */}
        <AvatarEditor config={avatarConfig} onChange={setAvatarConfig} />
      </View>
      <FixedBottomCTA label={t("Save")} onPress={handleSaveAvatar} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.bg.primary,
  },
  headerGradient: {
    paddingBottom: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: darkTheme.text.primary,
  },
  placeholder: {
    width: 40,
  },
});
