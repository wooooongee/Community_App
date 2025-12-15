import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet } from "react-native";
import InputField from "./InputField";

function PasswordInput() {
  const { control } = useFormContext();

  return (
    <Controller
      name="password"
      control={control}
      render={({ field: { onChange, value } }) => (
        <InputField
          label="비밀번호"
          placeholder="비밀번호을 입력해주세요."
          value={value}
          onChangeText={onChange}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({});

export default PasswordInput;
