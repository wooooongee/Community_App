import { darkTheme } from "@/constants";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const blurhash = "L6PZfSi_.AyE_3t7t7R**0o#DgR4";

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
        placeholder={{ blurhash }}
        contentFit="contain"
        transition={300}
        cachePolicy="memory-disk"
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
