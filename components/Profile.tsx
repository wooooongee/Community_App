import { baseUrls } from "@/api/axios";
import { darkTheme, spacing, radius, typography } from "@/constants/theme";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

dayjs.extend(relativeTime);

interface ProfileProps {
  onPress: () => void;
  nickname: string;
  imageUri?: string;
  createdAt: string;
  option?: ReactNode;
}

function Profile({
  onPress,
  imageUri,
  nickname,
  createdAt,
  option,
}: ProfileProps) {
  const { i18n } = useTranslation();

  return (
    <View style={styles.container}>
      <Pressable style={styles.profileContainer} onPress={onPress}>
        <View style={styles.avatarContainer}>
          <Image
            source={
              imageUri
                ? {
                    uri: `${
                      Platform.OS === "ios" ? baseUrls.ios : baseUrls.android
                    }/${imageUri}`,
                  }
                : require("@/assets/images/default-avatar.png")
            }
            style={styles.avatar}
          />
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
