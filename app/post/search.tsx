import SearchFeedList from "@/components/SearchFeedList";
import { darkTheme } from "@/constants/theme";
import { SafeAreaView, StyleSheet } from "react-native";

export default function SearchScreen() {
  return <SafeAreaView style={styles.container}>
    <SearchFeedList />
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.bg.primary,
  },
});
