import { darkTheme } from "@/constants/theme";
import useAuth from "@/hooks/queries/useAuth";
import { router, useFocusEffect } from "expo-router";
import React, { type ReactNode } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface AuthRouteProps {
  children: ReactNode;
}

function AuthRoute({ children }: AuthRouteProps) {
  const { auth, isLoading } = useAuth();

  useFocusEffect(() => {
    if (!isLoading && !auth.id) {
      router.replace("/auth");
    }
  });

  // 로딩 중이거나 인증되지 않은 경우 children 렌더링 안함
  if (isLoading || !auth.id) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={darkTheme.accent.primary} />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: darkTheme.bg.primary,
  },
});

export default AuthRoute;
