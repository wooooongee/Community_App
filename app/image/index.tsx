import { darkTheme } from "@/constants";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ImageZoomScreen() {
  const inset = useSafeAreaInsets();
  const { uri } = useLocalSearchParams<{ uri: string }>();

  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <Pressable
        style={[styles.backButton, { top: inset.top + 10 }]}
        onPress={() => router.back()}
      >
        <Feather name="arrow-left" size={28} color={"white"} />
      </Pressable>
      <Image
        source={{ uri }}
        resizeMode="contain"
        style={{ width: Dimensions.get("window").width, height: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.bg.primary,
  },
  backButton: {
    position: "absolute",
    left: 15,
    zIndex: 1,
    backgroundColor: darkTheme.bg.primary,
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
