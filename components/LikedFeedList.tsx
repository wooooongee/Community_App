import { darkTheme } from "@/constants";
import useGetInfiniteLikedPosts from "@/hooks/queries/useGetInfiniteLikedPost";
import { useScrollToTop } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import FeedItem from "./FeedItem";

function LikedFeedList() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteLikedPosts();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const ref = useRef<FlatList | null>(null);
  useScrollToTop(ref);

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
    <FlatList
      ref={ref}
      data={posts?.pages.flat()}
      renderItem={({ item }) => <FeedItem post={item} />}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={(item) => String(item.id)}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      // 성능 최적화 props
      initialNumToRender={8}
      maxToRenderPerBatch={8}
      windowSize={10}
      removeClippedSubviews={true}
      updateCellsBatchingPeriod={50}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: darkTheme.border.light,
    gap: 12,
  },
});

export default LikedFeedList;
