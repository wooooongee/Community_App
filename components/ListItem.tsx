import { colors } from "@/constants";
import React, { type ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
} from "react-native";

interface ListItemProps extends PressableProps {
  title: string;
  icon?: ReactNode;
}

const ListItem = ({ title, icon = null, ...props }: ListItemProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressedContainer,
      ]}
      {...props}
    >
      {icon}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 15,
    minHeight: 56,
    backgroundColor: colors.WHITE,
    borderColor: colors.GRAY_200,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  pressedContainer: {
    backgroundColor: colors.GRAY_200,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.BLACK,
  },
});

export default ListItem;
