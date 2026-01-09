import { darkTheme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Pressable } from "react-native";
import InputField from "./InputField";
import { useTranslation } from "react-i18next";

function VoteAttached() {
  const { control, setValue, resetField } = useFormContext();
  const [isVoteAttached] = useWatch({ control, name: ["isVoteAttached"] });
  const { t } = useTranslation();

  return (
    <>
      {isVoteAttached && (
        <InputField
          variant="outlined"
          editable={false}
          value={t("Vote attached")}
          rightChild={
            <Pressable
              onPress={() => {
                setValue("isVoteAttached", false);
                resetField("voteOptions");
              }}
            >
              <Ionicons name="close" size={20} color={darkTheme.text.primary} />
            </Pressable>
          }
        />
      )}
    </>
  );
}

export default VoteAttached;
