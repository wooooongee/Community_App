import { baseUrls } from "@/api/axios";
import { darkTheme } from "@/constants/theme";
import type { ImageUri } from "@/types";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { memo } from "react";
import { Platform, Pressable, ScrollView, StyleSheet } from "react-native";

interface ImagePreviewListProps {
  imageUris: ImageUri[];
}

const blurhash = "L6PZfSi_.AyE_3t7t7R**0o#DgR4";

function ImagePreviewList({ imageUris = [] }: ImagePreviewListProps) {
  if (imageUris.length === 0) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {imageUris.map(({ uri }, index) => {
        const imageUri = `${
          Platform.OS === "ios" ? baseUrls.ios : baseUrls.android
        }/${uri}`;

        return (
          <Pressable
            key={uri + index}
            style={styles.imageContainer}
            onPress={() =>
              router.push({ pathname: "/image", params: { uri: imageUri } })
            }
          >
            <Image
              style={styles.image}
              source={{ uri: imageUri }}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={200}
              cachePolicy="memory-disk"
            />
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
    flexGrow: 1,
  },
  imageContainer: {
    width: 90,
    height: 90,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});

export default memo(ImagePreviewList);
