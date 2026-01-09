import { darkTheme } from "@/constants";
import { Stack } from "expo-router";

export default function ImageLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: darkTheme.bg.primary,
        contentStyle: {
          backgroundColor: darkTheme.text.primary,
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
