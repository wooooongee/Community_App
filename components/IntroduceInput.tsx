import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";
import { useTranslation } from "react-i18next";

function IntroduceInput() {
  const { control } = useFormContext();
  const { t } = useTranslation();

  return (
    <Controller
      name="introduce"
      control={control}
      render={({ field: { ref, onChange, value } }) => (
        <InputField
          ref={ref}
          label={t("Introduce")}
          placeholder={t("Enter your introduction")} 
          returnKeyType="next"
          value={value}
          onChangeText={onChange}
        />
      )}
    />
  );
}

export default IntroduceInput;
