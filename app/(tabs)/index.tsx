import FeedList from "@/components/FeedList";
import SearchInput from "@/components/SearchInput";
import { darkTheme, spacing, radius, glow } from "@/constants/theme";
import useAuth from "@/hooks/queries/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import * as Haptics from "expo-haptics";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function HomeScreen() {
  const { auth } = useAuth();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  // FAB animation
  const fabScale = useSharedValue(1);

  const handleFabPressIn = () => {
    fabScale.value = withSpring(0.9, { damping: 15, stiffness: 200 });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleFabPressOut = () => {
    fabScale.value = withSpring(1, { damping: 15, stiffness: 200 });
  };

  const fabAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: fabScale.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Header with gradient accent */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <LinearGradient
          colors={['rgba(102, 126, 234, 0.15)', 'transparent']}
          style={styles.headerGradient}
        />
        <View style={styles.headerContent}>
          {/* Logo / App name */}
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={darkTheme.gradient.primary as any}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoGradient}
            >
              <Ionicons name="chatbubbles" size={20} color={darkTheme.text.primary} />
            </LinearGradient>
          </View>

          {/* Search */}
          <SearchInput
            readOnly
            placeholder={t("Search post title")}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.push("/post/search");
            }}
          />
        </View>
      </View>

      {/* Feed */}
      <FeedList />

      {/* FAB with gradient */}
      {auth.id && (
        <AnimatedPressable
          style={[styles.fab, { bottom: insets.bottom + spacing.lg }, fabAnimatedStyle]}
          onPressIn={handleFabPressIn}
          onPressOut={handleFabPressOut}
          onPress={() => router.push("/post/write")}
        >
          <LinearGradient
            colors={darkTheme.gradient.primary as any}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fabGradient}
          >
            <Ionicons name="add" size={28} color={darkTheme.text.primary} />
          </LinearGradient>
        </AnimatedPressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.bg.primary,
  },
  header: {
    paddingBottom: spacing.md,
    backgroundColor: darkTheme.bg.primary,
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  logoContainer: {
    ...glow.accent,
  },
  logoGradient: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    ...glow.accent,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
