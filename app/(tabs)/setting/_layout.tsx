import { darkTheme } from "@/constants/theme";
import { Stack } from "expo-router";

export default function SettingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: darkTheme.bg.primary,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "설정", headerShown: false }}
      />
    </Stack>
  );
}
