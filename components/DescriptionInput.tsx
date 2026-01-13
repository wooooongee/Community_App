import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import InputField from "./InputField";

function DescriptionInput() {
  const { control, setFocus } = useFormContext();
  const { t } = useTranslation();

  return (
    <Controller
      name="description"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length < 5) {
            return t("Content must be at least 5 characters");
          }
        },
      }}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          label={t("Content")}
          placeholder={t("Please enter content")}
          returnKeyType="next"
          value={value}
          onChangeText={onChange}
          error={error?.message}
          multiline
        />
      )}
    />
  );
}

export default DescriptionInput;
