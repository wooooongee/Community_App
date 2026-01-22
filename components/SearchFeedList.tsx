import { darkTheme, spacing } from "@/constants/theme";
import useAuth from "@/hooks/queries/useAuth";
import useGetInfiniteSearchPosts from "@/hooks/queries/useGetInfiniteSearchPosts";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import FeedItem from "./FeedItem";
import SearchInput from "./SearchInput";

function SearchFeedList() {
  const { auth } = useAuth();
  const [keyword, setKeyword] = useState("");
  const [submitKeyword, setSubmitKeyword] = useState("");
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteSearchPosts(submitKeyword);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  return (
    <>
      <View style={styles.inputContainer}>
        <View style={styles.arrowLeft}>
          <Feather
            name="arrow-left"
            size={24}
            color={darkTheme.text.primary}
            onPress={() => router.back()}
          />
        </View>
        <SearchInput
          autoFocus
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
          onSubmit={() => setSubmitKeyword(keyword)}
          onSubmitEditing={() => setSubmitKeyword(keyword)}
          placeholder="글 제목 검색"
        />
      </View>
      <FlatList
        data={posts?.pages.flat()}
        renderItem={({ item }) => <FeedItem post={item} authId={auth.id} />}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(item) => String(item.id)}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
        // 성능 최적화 props
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={10}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}
      />
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: spacing.md,
    backgroundColor: darkTheme.bg.primary,
    gap: spacing.md,
    flexGrow: 1,
  },
  inputContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.md,
    backgroundColor: darkTheme.bg.primary,
    flexDirection: "row",
    alignItems: "center",
  },
  arrowLeft: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SearchFeedList;
