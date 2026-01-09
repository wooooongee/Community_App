import queryClient from "@/api/queryClient";
import useAuth from "@/hooks/queries/useAuth";
import { resources } from "@/i18n/resources";
import { getSecureStore } from "@/utils/secureStore";
import { darkTheme } from "@/constants/theme";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useFonts } from "expo-font";
import { getLocales } from "expo-localization";
import * as Notifications from "expo-notifications";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import i18n from "i18next";
import { useEffect } from "react";
import { initReactI18next, useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import "react-native-reanimated";
import Toast, { BaseToast, ToastConfig } from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";

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

// Custom toast config for dark theme
const toastConfig: ToastConfig = {
  success: (props) => (
    <View style={styles.toastContainer}>
      <LinearGradient
        colors={darkTheme.gradient.primary as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.toastGradient}
      >
        <BaseToast
          {...props}
          style={styles.toast}
          contentContainerStyle={styles.toastContent}
          text1Style={styles.toastText1}
          text2Style={styles.toastText2}
        />
      </LinearGradient>
    </View>
  ),
  error: (props) => (
    <View style={styles.toastContainer}>
      <BaseToast
        {...props}
        style={[styles.toast, styles.errorToast]}
        contentContainerStyle={styles.toastContent}
        text1Style={styles.toastText1}
        text2Style={styles.toastText2}
      />
    </View>
  ),
};

export default function RootLayout() {
  const [loaded] = useFonts({
    "Pretendard-Regular": require("../assets/fonts/Pretendard-Regular.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={darkTheme.bg.primary} />
      <ActionSheetProvider>
        <QueryClientProvider client={queryClient}>
          <RootNavigator />
          <Toast config={toastConfig} />
        </QueryClientProvider>
      </ActionSheetProvider>
    </View>
  );
}

const deviceLanguage = getLocales()[0].languageCode ?? "ko";

i18n.use(initReactI18next).init({
  resources: resources,
  lng: deviceLanguage,
  fallbackLng: "ko-Kr",
});

function RootNavigator() {
  const { t } = useTranslation();
  const { auth } = useAuth();

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage =
        (await getSecureStore("language")) ?? deviceLanguage;
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
        dayjs.locale(savedLanguage);
      }
    };
    loadLanguage();
  }, [i18n]);

  useEffect(() => {
    auth.id &&
      Toast.show({
        type: "success",
        text1: t("Welcome Message", { nickname: auth.nickname ?? "회원" }),
      });
  }, [auth.id]);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: darkTheme.bg.primary,
        },
        headerTintColor: darkTheme.text.primary,
        headerTitleStyle: {
          fontWeight: '600',
        },
        contentStyle: {
          backgroundColor: darkTheme.bg.primary,
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="post" options={{ headerShown: false }} />
      <Stack.Screen name="image" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          title: "Modal",
          headerStyle: { backgroundColor: darkTheme.bg.secondary },
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.bg.primary,
  },
  toastContainer: {
    width: '90%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  toastGradient: {
    borderRadius: 12,
  },
  toast: {
    borderLeftWidth: 0,
    backgroundColor: 'transparent',
    borderRadius: 12,
    height: 60,
  },
  errorToast: {
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
  },
  toastContent: {
    paddingHorizontal: 16,
  },
  toastText1: {
    fontSize: 15,
    fontWeight: '600',
    color: darkTheme.text.primary,
  },
  toastText2: {
    fontSize: 13,
    color: darkTheme.text.secondary,
  },
});
