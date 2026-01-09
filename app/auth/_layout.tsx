import { darkTheme, spacing } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function CustomHeader({ title, showHome = false }: { title: string; showHome?: boolean }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
      <TouchableOpacity
        onPress={() => showHome ? router.replace("/") : router.back()}
        style={styles.backButton}
        activeOpacity={0.7}
      >
        <Ionicons
          name={showHome ? "home-outline" : "chevron-back"}
          size={24}
          color={darkTheme.text.primary}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.placeholder} />
    </View>
  );
}

export default function AuthLayout() {
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
        options={{
          headerShown: true,
          header: () => <CustomHeader title="로그인" showHome />,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="이메일 로그인" />,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="회원가입" />,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: darkTheme.bg.primary,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: darkTheme.text.primary,
  },
  placeholder: {
    width: 40,
  },
});
