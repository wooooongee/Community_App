import { darkTheme, radius, spacing, typography } from "@/constants/theme";
import type { LoreleiAvatarConfig } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import DiceBearAvatar, { generateAvatarSeed } from "./DiceBearAvatar";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_SIZE = (SCREEN_WIDTH - spacing.md * 2 - spacing.sm * 3) / 4;

// Lorelei 스타일 옵션 정의 (DiceBear 공식 옵션명 사용)
const LORELEI_OPTIONS = {
  hair: Array.from(
    { length: 47 },
    (_, i) => `variant${String(i + 1).padStart(2, "0")}`
  ),
  eyes: Array.from(
    { length: 13 },
    (_, i) => `variant${String(i + 1).padStart(2, "0")}`
  ),
  eyebrows: Array.from(
    { length: 9 },
    (_, i) => `variant${String(i + 1).padStart(2, "0")}`
  ),
  // mouth는 happy01~happy18, sad01~sad09 형식
  mouth: [
    "happy01",
    "happy02",
    "happy03",
    "happy04",
    "happy05",
    "happy06",
    "happy07",
    "happy08",
    "happy09",
    "happy10",
    "happy11",
    "happy12",
    "happy13",
    "happy14",
    "happy15",
    "happy16",
    "happy17",
    "happy18",
    "sad01",
    "sad02",
    "sad03",
    "sad04",
    "sad05",
    "sad06",
    "sad07",
    "sad08",
    "sad09",
  ],
  nose: Array.from(
    { length: 5 },
    (_, i) => `variant${String(i + 1).padStart(2, "0")}`
  ),
  glasses: [
    "none",
    ...Array.from(
      { length: 5 },
      (_, i) => `variant${String(i + 1).padStart(2, "0")}`
    ),
  ],
  earrings: [
    "none",
    ...Array.from(
      { length: 3 },
      (_, i) => `variant${String(i + 1).padStart(2, "0")}`
    ),
  ],
  head: Array.from(
    { length: 4 },
    (_, i) => `variant${String(i + 1).padStart(2, "0")}`
  ),
};

type CategoryKey = keyof typeof LORELEI_OPTIONS;

interface AvatarEditorProps {
  config: LoreleiAvatarConfig;
  onChange: (config: LoreleiAvatarConfig) => void;
}

function AvatarEditor({ config, onChange }: AvatarEditorProps) {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("hair");

  const categories: {
    key: CategoryKey;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
  }[] = [
    { key: "hair", label: t("Hair"), icon: "cut-outline" },
    { key: "eyes", label: t("Eyes"), icon: "eye-outline" },
    { key: "eyebrows", label: t("Eyebrows"), icon: "remove-outline" },
    { key: "mouth", label: t("Mouth"), icon: "happy-outline" },
    { key: "nose", label: t("Nose"), icon: "ellipse-outline" },
    { key: "glasses", label: t("Glasses"), icon: "glasses-outline" },
    { key: "earrings", label: t("Earrings"), icon: "diamond-outline" },
    { key: "head", label: t("Head"), icon: "person-outline" },
  ];

  const handleRandomize = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const newSeed = generateAvatarSeed();
    onChange({
      seed: newSeed,
      backgroundColor: ["transparent"],
      hair: undefined,
      eyes: undefined,
      eyebrows: undefined,
      mouth: undefined,
      nose: undefined,
      glasses: undefined,
      glassesProbability: 30,
      earrings: undefined,
      earringsProbability: 30,
      head: undefined,
    });
  }, [onChange]);

  const handleSelectOption = useCallback(
    (category: CategoryKey, option: string) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      if (option === "none") {
        if (category === "glasses") {
          onChange({ ...config, glasses: undefined, glassesProbability: 0 });
        } else if (category === "earrings") {
          onChange({ ...config, earrings: undefined, earringsProbability: 0 });
        }
      } else {
        const update: Partial<LoreleiAvatarConfig> = {
          [category]: [option],
        };
        if (category === "glasses") {
          update.glassesProbability = 100;
        } else if (category === "earrings") {
          update.earringsProbability = 100;
        }
        onChange({ ...config, ...update });
      }
    },
    [config, onChange]
  );

  const getCurrentSelection = useCallback(
    (category: CategoryKey): string | undefined => {
      const value = config[category];
      if (Array.isArray(value) && value.length > 0) {
        return value[0];
      }
      if (category === "glasses" && config.glassesProbability === 0) {
        return "none";
      }
      if (category === "earrings" && config.earringsProbability === 0) {
        return "none";
      }
      return undefined;
    },
    [config]
  );

  // 옵션별 미리보기 config 생성
  const getPreviewConfig = useCallback(
    (category: CategoryKey, option: string): LoreleiAvatarConfig => {
      const previewConfig: LoreleiAvatarConfig = {
        ...config,
        [category]: option === "none" ? undefined : [option],
      };

      if (category === "glasses") {
        previewConfig.glassesProbability = option === "none" ? 0 : 100;
      } else if (category === "earrings") {
        previewConfig.earringsProbability = option === "none" ? 0 : 100;
      }

      return previewConfig;
    },
    [config]
  );

  return (
    <View style={styles.container}>
      {/* 아바타 미리보기 */}
      <View style={styles.previewSection}>
        <LinearGradient
          colors={darkTheme.gradient.primary as [string, string, ...string[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.previewGradient}
        >
          <View style={styles.avatarWrapper}>
            <DiceBearAvatar config={config} size={120} />
          </View>
        </LinearGradient>

        {/* 랜덤 버튼 */}
        <Pressable style={styles.randomButton} onPress={handleRandomize}>
          <LinearGradient
            colors={
              darkTheme.gradient.secondary as [string, string, ...string[]]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.randomGradient}
          >
            <Ionicons name="shuffle" size={18} color={darkTheme.text.primary} />
            <Text style={styles.randomText}>{t("Random")}</Text>
          </LinearGradient>
        </Pressable>
      </View>

      {/* 카테고리 탭 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
        style={styles.categoryScroll}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <Pressable
              key={cat.key}
              style={[styles.categoryTab, isActive && styles.categoryTabActive]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setActiveCategory(cat.key);
              }}
            >
              <Ionicons
                name={cat.icon}
                size={16}
                color={
                  isActive ? darkTheme.text.primary : darkTheme.text.tertiary
                }
              />
              <Text
                style={[
                  styles.categoryLabel,
                  isActive && styles.categoryLabelActive,
                ]}
              >
                {cat.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* 옵션 그리드 */}
      <ScrollView
        style={styles.optionsScrollView}
        contentContainerStyle={styles.optionsContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.optionsGrid}>
          {LORELEI_OPTIONS[activeCategory].map((option) => {
            const isSelected = getCurrentSelection(activeCategory) === option;
            const isNone = option === "none";
            const previewConfig = getPreviewConfig(activeCategory, option);

            return (
              <OptionItem
                key={option}
                previewConfig={previewConfig}
                isSelected={isSelected}
                isNone={isNone}
                onPress={() => handleSelectOption(activeCategory, option)}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

// 옵션 아이템 컴포넌트 (아바타 미리보기 포함)
const OptionItem = React.memo(function OptionItem({
  previewConfig,
  isSelected,
  isNone,
  onPress,
}: {
  previewConfig: LoreleiAvatarConfig;
  isSelected: boolean;
  isNone: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      style={[
        styles.optionItem,
        isSelected && styles.optionItemSelected,
        animatedStyle,
      ]}
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.92, { damping: 15, stiffness: 200 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 200 });
      }}
    >
      {isNone ? (
        <View style={styles.noneOption}>
          <Ionicons
            name="close-circle"
            size={32}
            color={
              isSelected ? darkTheme.accent.primary : darkTheme.text.tertiary
            }
          />
        </View>
      ) : (
        <DiceBearAvatar config={previewConfig} size={ITEM_SIZE - 16} />
      )}
      {isSelected && (
        <View style={styles.selectedIndicator}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={darkTheme.accent.primary}
          />
        </View>
      )}
    </AnimatedPressable>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  previewSection: {
    alignItems: "center",
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  previewGradient: {
    width: 140,
    height: 140,
    borderRadius: 70,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarWrapper: {
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: darkTheme.bg.secondary,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  randomButton: {
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  randomGradient: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  randomText: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: darkTheme.text.primary,
  },
  categoryScroll: {
    flexGrow: 0,
    flexShrink: 0,
  },
  categoryContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  categoryTab: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: darkTheme.bg.tertiary,
    marginRight: spacing.sm,
  },
  categoryTabActive: {
    backgroundColor: darkTheme.bg.secondary,
    borderWidth: 1,
    borderColor: darkTheme.accent.primary,
  },
  categoryLabel: {
    fontSize: typography.size.sm,
    color: darkTheme.text.tertiary,
    fontWeight: typography.weight.medium,
  },
  categoryLabelActive: {
    color: darkTheme.text.primary,
    fontWeight: typography.weight.semibold,
  },
  optionsScrollView: {
    flex: 1,
  },
  optionsContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: 120,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  optionItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: radius.lg,
    backgroundColor: darkTheme.bg.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
    overflow: "hidden",
  },
  optionItemSelected: {
    borderColor: darkTheme.accent.primary,
  },
  noneOption: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedIndicator: {
    position: "absolute",
    top: 4,
    right: 4,
  },
});

export default AvatarEditor;
