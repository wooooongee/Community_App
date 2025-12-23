import queryClient from "@/api/queryClient";
import useAuth from "@/hooks/queries/useAuth";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { QueryClientProvider } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { useEffect } from "react";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

export const unstable_settings = {
  anchor: "(tabs)",
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  return (
    <ActionSheetProvider>
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
        <Toast />
      </QueryClientProvider>
    </ActionSheetProvider>
  );
}

function RootNavigator() {
  const { auth } = useAuth();

  useEffect(() => {
    auth.id &&
      Toast.show({
        type: "success",
        text1: `${auth.nickname ?? "회원"}님 환영합니다!`,
      });
  }, [auth.id]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="post" options={{ headerShown: false }} />
      <Stack.Screen name="image" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{ presentation: "modal", title: "Modal" }}
      />
    </Stack>
  );
}
