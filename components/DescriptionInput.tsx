import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet } from "react-native";
import InputField from "./InputField";

function DescriptionInput() {
  const { control, setFocus } = useFormContext();

  return (
    <Controller
      name="description"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length < 5) {
            return "내용을 5자 이상 입력해주세요.";
          }
        },
      }}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          autoFocus
          label="내용"
          placeholder="내용을 입력해주세요."
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

const styles = StyleSheet.create({});

export default DescriptionInput;
