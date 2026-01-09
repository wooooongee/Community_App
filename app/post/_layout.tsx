import { darkTheme, spacing } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function CustomHeader({
  title,
  rightComponent,
}: {
  title: string;
  rightComponent?: React.ReactNode;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
      <TouchableOpacity
        onPress={() =>
          router.canGoBack() ? router.back() : router.replace("/")
        }
        style={styles.backButton}
        activeOpacity={0.7}
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color={darkTheme.text.primary}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightContainer}>
        {rightComponent || <View style={styles.placeholder} />}
      </View>
    </View>
  );
}

export default function PostLayout() {
  const { t } = useTranslation();
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
        name="write"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="" />,
        }}
      />
      <Stack.Screen
        name="update/[id]"
        options={{
          headerShown: false,
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

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: darkTheme.bg.primary,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: darkTheme.text.primary,
  },
  rightContainer: {
    width: 40,
    alignItems: "flex-end",
  },
  placeholder: {
    width: 40,
  },
});
