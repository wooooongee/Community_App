import { colors } from "@/constants";
import { Foundation } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";

export default function ProfileLayout() {
  const { t } = useTranslation();
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.BLACK,
        contentStyle: {
          backgroundColor: colors.WHITE,
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
              <Foundation name="arrow-left" size={28} color={"black"} />
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
              <Foundation name="arrow-left" size={28} color={"black"} />
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
              <Foundation name="arrow-left" size={28} color={"black"} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
