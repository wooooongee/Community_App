import { darkTheme } from "@/constants/theme";
import type { LoreleiAvatarConfig } from "@/types";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";

interface DiceBearAvatarProps {
  config?: LoreleiAvatarConfig;
  size?: number;
  style?: object;
}

// 기본 아바타 설정
export const defaultAvatarConfig: LoreleiAvatarConfig = {
  seed: "default",
  backgroundColor: ["transparent"],
};

// 사용자 ID 기반으로 랜덤 seed 생성
export function generateAvatarSeed(userId?: number | string): string {
  if (userId) {
    return `user_${userId}`;
  }
  return `random_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}

function DiceBearAvatar({
  config = defaultAvatarConfig,
  size = 48,
  style,
}: DiceBearAvatarProps) {
  const avatarSvg = useMemo(() => {
    try {
      // DiceBear 옵션 객체 생성 - undefined인 값은 제외
      const options: Record<string, any> = {
        seed: config.seed,
        size: size,
        backgroundColor: config.backgroundColor || ["transparent"],
      };

      // 선택적 옵션들 - 값이 있을 때만 추가
      if (config.flip !== undefined) options.flip = config.flip;
      if (config.beard) options.beard = config.beard;
      if (config.beardProbability !== undefined) options.beardProbability = config.beardProbability;
      if (config.earrings) options.earrings = config.earrings;
      if (config.earringsProbability !== undefined) options.earringsProbability = config.earringsProbability;
      if (config.eyebrows) options.eyebrows = config.eyebrows;
      if (config.eyes) options.eyes = config.eyes;
      if (config.freckles) options.freckles = config.freckles;
      if (config.frecklesProbability !== undefined) options.frecklesProbability = config.frecklesProbability;
      if (config.glasses) options.glasses = config.glasses;
      if (config.glassesProbability !== undefined) options.glassesProbability = config.glassesProbability;
      if (config.hair) options.hair = config.hair;
      if (config.head) options.head = config.head;
      if (config.mouth) options.mouth = config.mouth;
      if (config.nose) options.nose = config.nose;

      const avatar = createAvatar(lorelei, options);
      return avatar.toString();
    } catch (error) {
      console.log("Avatar generation error:", error);
      return null;
    }
  }, [config, size]);

  if (!avatarSvg) {
    return (
      <View
        style={[
          styles.fallback,
          { width: size, height: size, borderRadius: size / 2 },
          style,
        ]}
      />
    );
  }

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <SvgXml xml={avatarSvg} width={size} height={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 999,
    backgroundColor: darkTheme.bg.tertiary,
  },
  fallback: {
    backgroundColor: darkTheme.bg.tertiary,
  },
});

export default DiceBearAvatar;
