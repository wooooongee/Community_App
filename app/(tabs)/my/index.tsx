import { baseUrls } from "@/api/axios";
import AuthRoute from "@/components/AuthRoute";
import CustomButton from "@/components/CustomButton";
import LikedFeedList from "@/components/LikedFeedList";
import MyFeedList from "@/components/MyFeedList";
import Tab from "@/components/Tab";
import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

export default function MyScreen() {
  const { auth } = useAuth();
  const [currentTab, setCurrentTab] = useState(0);
  const pagerRef = useRef<PagerView | null>(null);
  const { t } = useTranslation();

  const handlePressTab = (index: number) => {
    pagerRef.current?.setPage(index);
    setCurrentTab(index);
  };

  return (
    <AuthRoute>
      <View style={styles.header}>
        <Image
          source={
            auth.imageUri
              ? {
                  uri: `${
                    Platform.OS === "ios" ? baseUrls.ios : baseUrls.android
                  }/${auth.imageUri}`,
                }
              : require("@/assets/images/default-avatar.png")
          }
          style={styles.avatar}
        />
        <CustomButton
          size="medium"
          variant="outlined"
          label={t("Edit Profile")}
          style={{ position: "absolute", right: 16, bottom: 16 }}
          onPress={() => router.push("/profile/update")}
        />
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
  header: {
    position: "relative",
    backgroundColor: colors.ORANGE_200,
    width: "100%",
    height: 154,
  },
  avatar: {
    position: "absolute",
    top: 77,
    left: 16,
    width: 154,
    height: 154,
    borderRadius: 154,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_500,
  },
  container: {
    marginTop: 77,
  },
  profile: {
    padding: 16,
    gap: 16,
  },
  nickname: {
    fontSize: 24,
    fontWeight: "bold",
  },
  introduce: {
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: "row",
  },
});
