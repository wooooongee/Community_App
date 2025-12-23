import { colors } from "@/constants";
import { Feather } from "@expo/vector-icons";
import { Link, Stack, router } from "expo-router";
import { Pressable } from "react-native";
import { useTranslation } from "react-i18next"; 

export default function PostLayout() {
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
        name="write"
        options={{
          title: t("Write Post"),
          headerShown: true,
          headerLeft: () => (
            <Link href={"/"} replace>
              <Feather name="arrow-left" size={28} color={"black"} />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <Pressable
              onPress={() =>
                router.canGoBack() ? router.back() : router.replace("/")
              }
            >
              <Feather name="arrow-left" size={28} color={"black"} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="update/[id]"
        options={{
          title: t("Edit Post"),
          headerShown: true,
          headerLeft: () => (
            <Feather
              name="arrow-left"
              size={28}
              color={"black"}
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
