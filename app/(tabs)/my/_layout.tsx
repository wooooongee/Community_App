import { darkTheme } from "@/constants/theme";
import { Stack } from "expo-router";

export default function MyLayout() {
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
        options={{ title: "내 프로필", headerShown: false }}
      />
    </Stack>
  );
}
