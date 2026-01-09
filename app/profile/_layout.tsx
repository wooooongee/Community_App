import { darkTheme, typography } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";

export default function ProfileLayout() {
  const { t } = useTranslation();
  return (
    <Stack
      screenOptions={{
        headerTintColor: darkTheme.text.primary,
        headerStyle: {
          backgroundColor: darkTheme.bg.primary,
        },
        headerTitleStyle: {
          color: darkTheme.text.primary,
          fontWeight: typography.weight.semibold,
        },
        contentStyle: {
          backgroundColor: darkTheme.bg.primary,
        },
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerBackButtonDisplayMode: "minimal",
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={28} color={darkTheme.text.primary} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="update"
        options={{
          headerShown: true,
          headerBackButtonDisplayMode: "minimal",
          headerShadowVisible: false,
          headerTitle: t("Edit Profile"),
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={28} color={darkTheme.text.primary} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="avatar"
        options={{
          headerShown: true,
          headerBackButtonDisplayMode: "minimal",
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={28} color={darkTheme.text.primary} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
