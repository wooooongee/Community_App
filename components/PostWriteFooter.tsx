import { darkTheme, spacing, radius } from "@/constants/theme";
import useUploadImages from "@/hooks/queries/useUploadImages";
import { getFormDataImages } from "@/utils/image";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function PostWriteFooter() {
  const inset = useSafeAreaInsets();
  const { control, setValue } = useFormContext();
  const [imageUris] = useWatch({ control, name: ["imageUris"] });
  const uploadImages = useUploadImages();

  const addImageUris = (uris: string[]) => {
    if (imageUris.length + uris.length > 5) {
      Alert.alert("이미지 개수 초과", "추가 가능한 이미지는 최대 5개입니다.");
      return;
    }

    setValue("imageUris", [...imageUris, ...uris.map((uri) => ({ uri: uri }))]);
  };

  const handleOpenImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsMultipleSelection: true,
    });

    if (result.canceled) {
      return;
    }

    const formData = getFormDataImages("images", result.assets);
    uploadImages.mutate(formData, {
      onSuccess: (data: string[]) => addImageUris(data),
    });
  };

  return (
    <View style={[styles.container, { paddingBottom: inset.bottom || spacing.md }]}>
      <Pressable style={styles.footerIcon} onPress={handleOpenImagePick}>
        <Ionicons name="camera-outline" size={20} color={darkTheme.text.primary} />
      </Pressable>
      <Pressable
        style={styles.footerIcon}
        onPress={() => setValue("isVoteOpen", true)}
      >
        <MaterialCommunityIcons name="vote-outline" size={20} color={darkTheme.text.primary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: darkTheme.bg.primary,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: darkTheme.border.default,
    flexDirection: "row",
    gap: spacing.md,
  },
  footerIcon: {
    backgroundColor: darkTheme.bg.tertiary,
    padding: spacing.md,
    borderRadius: radius.sm,
  },
});

export default PostWriteFooter;
