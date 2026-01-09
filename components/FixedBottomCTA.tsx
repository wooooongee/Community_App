import { darkTheme, spacing } from "@/constants/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomButton from "./CustomButton";

interface FixedBottomCTAProps {
  label: string;
  onPress: () => void;
}

function FixedBottomCTA({ label, onPress }: FixedBottomCTAProps) {
  const inset = useSafeAreaInsets();
  return (
    <View style={[styles.fixed, { paddingBottom: inset.bottom || spacing.md }]}>
      <CustomButton label={label} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  fixed: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: darkTheme.border.default,
    backgroundColor: darkTheme.bg.primary,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.lg,
  },
});

export default FixedBottomCTA;
