import AuthRoute from "@/components/AuthRoute";
import CustomButton from "@/components/CustomButton";
import DiceBearAvatar, {
  defaultAvatarConfig,
  generateAvatarSeed,
} from "@/components/DiceBearAvatar";
import LikedFeedList from "@/components/LikedFeedList";
import MyFeedList from "@/components/MyFeedList";
import Tab from "@/components/Tab";
import { darkTheme, spacing, typography } from "@/constants/theme";
import useAuth from "@/hooks/queries/useAuth";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HEADER_BASE_HEIGHT = 120;
const AVATAR_SIZE = 120;

export default function MyScreen() {
  const { auth } = useAuth();
  const [currentTab, setCurrentTab] = useState(0);
  const pagerRef = useRef<PagerView | null>(null);
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const handlePressTab = (index: number) => {
    pagerRef.current?.setPage(index);
    setCurrentTab(index);
  };

  const headerHeight = HEADER_BASE_HEIGHT + insets.top;
  const avatarTop = headerHeight - AVATAR_SIZE / 2;

  return (
    <AuthRoute>
      <View style={styles.headerWrapper}>
        <LinearGradient
          colors={darkTheme.gradient.primary as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.header, { height: headerHeight }]}
        >
          <CustomButton
            size="medium"
            variant="outlined"
            label={t("Edit Profile")}
            style={{ position: "absolute", right: 16, bottom: 16 }}
            onPress={() => router.push("/profile/update")}
          />
        </LinearGradient>
        <View style={[styles.avatar, { top: avatarTop }]}>
          <DiceBearAvatar
            config={
              auth.avatarConfig ?? {
                ...defaultAvatarConfig,
                seed: generateAvatarSeed(auth.id || auth.nickname),
              }
            }
            size={AVATAR_SIZE - 6}
          />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Text style={styles.nickname}>{auth.nickname}</Text>
          <Text style={styles.introduce}>{auth.introduce}</Text>
        </View>

        <View style={styles.tabContainer}>
          <Tab isActive={currentTab === 0} onPress={() => handlePressTab(0)}>
            {t("Posts")}
          </Tab>
          <Tab isActive={currentTab === 1} onPress={() => handlePressTab(1)}>
            {t("Liked Posts")}
          </Tab>
        </View>
      </View>
      <PagerView
        ref={pagerRef}
        initialPage={0}
        style={{ flex: 1 }}
        onPageSelected={(e) => setCurrentTab(e.nativeEvent.position)}
      >
        <MyFeedList key="1" />
        <LikedFeedList key="2" />
      </PagerView>
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
