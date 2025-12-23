import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";
import { useTranslation } from "react-i18next"; 

function TitleInput() {
  const { control, setFocus } = useFormContext();
  const { t } = useTranslation(); 

  return (
    <Controller
      name="title"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length <= 0) {
            return t("Please enter a title"); 
          }
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          label={t("Title")}
          placeholder={t("Please enter a title")} 
          submitBehavior="submit"
          returnKeyType="next"
          value={value}
          onChangeText={onChange}
          onSubmitEditing={() => setFocus("description")}
          error={error?.message}
        />
      )}
    />
  );
}

export default TitleInput;
