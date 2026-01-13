import AuthRoute from "@/components/AuthRoute";
import DiceBearAvatar, {
  defaultAvatarConfig,
  generateAvatarSeed,
} from "@/components/DiceBearAvatar";
import Tab from "@/components/Tab";
import UserFeedList from "@/components/UserFeedList";
import { darkTheme, spacing, typography } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import useGetUserProfile from "@/hooks/queries/useGetUserProfile";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HEADER_BASE_HEIGHT = 120;
const AVATAR_SIZE = 120;

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { id: userId } = useLocalSearchParams();
  const { auth } = useAuth();
  const { data: profile } = useGetUserProfile(Number(userId));
  const { nickname, introduce, avatarConfig } = profile || {};
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const headerHeight = HEADER_BASE_HEIGHT + insets.top;
  const avatarTop = headerHeight - AVATAR_SIZE / 2;

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  if (Number(userId) === Number(auth.id)) {
    return <Redirect href="/my" />;
  }

  return (
    <AuthRoute>
      <View style={styles.headerWrapper}>
        <LinearGradient
          colors={darkTheme.gradient.primary as [string, string, ...string[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.header, { height: headerHeight }]}
        />
        <View style={[styles.avatar, { top: avatarTop }]}>
          <DiceBearAvatar
            config={
              avatarConfig ?? {
                ...defaultAvatarConfig,
                seed: generateAvatarSeed(Number(userId)),
              }
            }
            size={AVATAR_SIZE - 6}
          />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Text style={styles.nickname}>{nickname}</Text>
          <Text style={styles.introduce}>{introduce}</Text>
        </View>
      </View>
      <View style={styles.tabContainer}>
        <Tab isActive>{t("Posts")}</Tab>
      </View>
      <UserFeedList userId={Number(userId)} />
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    position: "relative",
    backgroundColor: darkTheme.bg.primary,
  },
  header: {
    position: "relative",
    width: "100%",
  },
  avatar: {
    position: "absolute",
    left: spacing.lg,
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 3,
    borderColor: darkTheme.bg.primary,
    backgroundColor: darkTheme.bg.secondary,
    zIndex: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    paddingTop: AVATAR_SIZE / 2,
    backgroundColor: darkTheme.bg.primary,
  },
  profile: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  nickname: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: darkTheme.text.primary,
  },
  introduce: {
    fontSize: typography.size.sm,
    color: darkTheme.text.secondary,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: darkTheme.bg.primary,
  },
});
