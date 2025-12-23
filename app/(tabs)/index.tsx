import FeedList from "@/components/FeedList";
import SearchInput from "@/components/SearchInput";
import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

export default function HomeScreen() {
  const { auth } = useAuth();
  const { t } = useTranslation(); 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
        <SearchInput
          readOnly
          placeholder={t("Search post title")} 
          onPress={() => router.push("/post/search")}
        />
      </View>
      <FeedList />
      {auth.id && (
        <Pressable
          style={styles.writeButton}
          onPress={() => router.push("/post/write")}
        >
          <Ionicons name="pencil" size={32} color={colors.WHITE} />
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  inputContainer: {
    marginBottom: 8,
    paddingHorizontal: 16,
    gap: 8,
    backgroundColor: colors.WHITE,
    flexDirection: "row",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  logo: {
    width: 44,
    height: 44,
  },
  writeButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: colors.ORANGE_600,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.5,
  },
});
