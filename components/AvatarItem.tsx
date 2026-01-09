import { baseUrls } from "@/api/axios";
import { darkTheme, radius, spacing } from "@/constants/theme";
import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  type PressableProps,
} from "react-native";

interface AvatarItemProps extends PressableProps {
  uri: string;
  isSelected: boolean;
}

function AvatarItem({ uri, isSelected, ...props }: AvatarItemProps) {
  return (
    <Pressable
      {...props}
      style={[styles.container, isSelected && styles.selectedContainer]}
    >
      <Image
        source={{
          uri: `${
            Platform.OS === "ios" ? baseUrls.ios : baseUrls.android
          }/${uri}`,
        }}
        style={styles.image}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: spacing.xs,
    width: Dimensions.get("window").width / 3 - 15,
    height: Dimensions.get("window").width / 3 - 15,
    borderWidth: 2,
    borderRadius: radius.md,
    borderColor: darkTheme.border.default,
    backgroundColor: darkTheme.bg.secondary,
  },
  selectedContainer: {
    borderColor: darkTheme.accent.primary,
    borderWidth: 3,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default AvatarItem;
