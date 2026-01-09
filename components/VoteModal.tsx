import { darkTheme, spacing, typography } from "@/constants/theme";
import type { VoteOption } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import VoteInput from "./VoteInput";
import { useTranslation } from "react-i18next";

const VoteModal = () => {
  const { control, setValue } = useFormContext();
  const { t } = useTranslation();
  const [voteOptions, isVoteOpen] = useWatch({
    control,
    name: ["voteOptions", "isVoteOpen"],
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "voteOptions",
  });

  const handleAppendVote = () => {
    const priorities = voteOptions.map(
      (vote: VoteOption) => vote.displayPriority
    );
    const nextPriority = Math.max(...priorities) + 1;
    append({ displayPriority: nextPriority, content: "" });
  };

  const handleSubmitVote = () => {
    if (voteOptions.length < 2) {
      Alert.alert(t("Add at least 2 vote options"), "");
      return;
    }

    setValue("isVoteAttached", true);
    setValue("isVoteOpen", false);
  };

  return (
    <Modal visible={isVoteOpen} animationType="slide">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => setValue("isVoteOpen", false)}
            style={styles.headerLeft}
          >
            <Ionicons name="chevron-back" size={24} color={darkTheme.text.primary} />
          </Pressable>
          <Text style={styles.headerTitle}>{t("Vote")}</Text>
          <Text style={styles.headerRight} onPress={handleSubmitVote}>
            {t("Attach")}
          </Text>
        </View>
        <KeyboardAwareScrollView
          contentContainerStyle={{ gap: spacing.md, padding: spacing.lg }}
        >
          {fields.map((field, index) => {
            return (
              <VoteInput
                key={field.id}
                index={index}
                onRemove={() => remove(index)}
              />
            );
          })}
          <Pressable onPress={handleAppendVote}>
            <Text style={styles.addVoteText}>{t("Add option")}</Text>
          </Pressable>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.bg.primary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  headerTitle: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: darkTheme.text.primary,
  },
  headerRight: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    color: darkTheme.accent.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  addVoteText: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    color: darkTheme.text.tertiary,
    textAlign: "center",
  },
});

export default VoteModal;
