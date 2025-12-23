import SearchFeedList from "@/components/SearchFeedList";
import { colors } from "@/constants";
import { SafeAreaView, StyleSheet } from "react-native";

export default function SearchScreen() {
  return <SafeAreaView style={styles.container}>
    <SearchFeedList />
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
