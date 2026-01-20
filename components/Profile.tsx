import { darkTheme, spacing, radius, typography } from "@/constants/theme";
import type { LoreleiAvatarConfig } from "@/types";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DiceBearAvatar, { defaultAvatarConfig, generateAvatarSeed } from "./DiceBearAvatar";

dayjs.extend(relativeTime);

interface ProfileProps {
  onPress: () => void;
  userId?: number;
  nickname: string;
  imageUri?: string;
  avatarConfig?: LoreleiAvatarConfig;
  createdAt: string;
  option?: ReactNode;
}

function Profile({
  onPress,
  userId,
  imageUri,
  avatarConfig,
  nickname,
  createdAt,
  option,
}: ProfileProps) {
  const { i18n } = useTranslation();

  // avatarConfig가 있으면 DiceBear 사용, 없으면 userId 기반 기본 아바타 생성
  const renderAvatar = () => {
    if (avatarConfig) {
      return <DiceBearAvatar config={avatarConfig} size={44} />;
    }
    // avatarConfig가 없으면 userId 기반 기본 아바타 생성 (일관성 유지)
    const fallbackConfig: LoreleiAvatarConfig = {
      ...defaultAvatarConfig,
      seed: generateAvatarSeed(userId || nickname),
    };
    return <DiceBearAvatar config={fallbackConfig} size={44} />;
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.profileContainer} onPress={onPress}>
        <View style={styles.avatarContainer}>
          {renderAvatar()}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.nickname}>{nickname}</Text>
          <Text style={styles.createdAt}>
            {dayjs(createdAt).locale(i18n.language).fromNow()}
          </Text>
        </View>
      </Pressable>
      {option}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  avatarContainer: {
    borderRadius: radius.full,
    padding: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
  },
  textContainer: {
    gap: spacing.xs,
  },
  nickname: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
    color: darkTheme.text.primary,
  },
  createdAt: {
    fontSize: typography.size.sm,
    color: darkTheme.text.tertiary,
  },
});

export default Profile;
