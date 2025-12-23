import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";
import { useTranslation } from "react-i18next";

function NicknameInput() {
  const { control, setFocus } = useFormContext();
  const { t } = useTranslation();

  return (
    <Controller
      name="nickname"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length < 2) {
            return t("Nickname must be at least 2 characters"); 
          }
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          label={t("Nickname")} 
          placeholder={t("Enter your nickname")}
          inputMode="text"
          returnKeyType="next"
          submitBehavior="submit"
          value={value}
          onChangeText={onChange}
          onSubmitEditing={() => setFocus("introduce")}
          error={error?.message}
        />
      )}
    />
  );
}

export default NicknameInput;
