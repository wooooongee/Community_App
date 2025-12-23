import { colors } from "@/constants";
import type { VoteOption } from "@/types";
import { Feather } from "@expo/vector-icons";
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
            <Feather name="arrow-left" size={28} color={colors.BLACK} />
          </Pressable>
          <Text style={styles.headerTitle}>{t("Vote")}</Text>
          <Text style={styles.headerRight} onPress={handleSubmitVote}>
            {t("Attach")} 
          </Text>
        </View>
        <KeyboardAwareScrollView
          contentContainerStyle={{ gap: 12, padding: 16 }}
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
    backgroundColor: colors.WHITE,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.BLACK,
  },
  headerRight: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.ORANGE_600,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  addVoteText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.GRAY_500,
    textAlign: "center",
  },
});

export default VoteModal;
