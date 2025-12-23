import AuthRoute from "@/components/AuthRoute";
import ListItem from "@/components/ListItem";
import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import { saveSecureStore } from "@/utils/secureStore";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Entypo, Octicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet, View } from "react-native";

export default function SettingScreen() {
  const { logout } = useAuth();
  const { i18n, t } = useTranslation();
  const { showActionSheetWithOptions } = useActionSheet();

  const handlePressLanguage = () => {
    const options = ["English", "한국어", t("Cancel")];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex?: number) => {
        let lang = "";
        switch (selectedIndex) {
          case 0:
            lang = "en";
            break;
          case 1:
            lang = "ko";
            break;
        }
        if (lang) {
          i18n.changeLanguage(lang);
          saveSecureStore("language", lang);
          dayjs.locale(lang);
        }
      }
    );
  };

  return (
    <AuthRoute>
      <SafeAreaView>
        <View style={styles.space} />
        <ListItem
          title={t("Language Setting")}
          onPress={handlePressLanguage}
          icon={<Entypo name="language" size={16} color={colors.BLACK} />}
        />
        <View style={styles.space} />
        <ListItem
          title={t("Logout")}
          onPress={logout}
          icon={<Octicons name="sign-out" size={16} color={colors.BLACK} />}
        />
      </SafeAreaView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  space: {
    height: 30,
  },
});
