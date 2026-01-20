import { darkTheme, spacing } from "@/constants/theme";
import useGetInfinitePosts from "@/hooks/queries/useGetInfinitePosts";
import type { Post } from "@/types";
import { useScrollToTop } from "@react-navigation/native";
import React, { useRef, useState, useCallback } from "react";
import { FlatList, StyleSheet, View, ActivityIndicator, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import Animated, { FadeInUp, FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withSpring, interpolate, Extrapolation } from "react-native-reanimated";
import FeedItem from "./FeedItem";

const REFRESH_THRESHOLD = 80;
const ANIMATION_ITEM_LIMIT = 5; // 처음 5개 항목에만 애니메이션 적용

function FeedList() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
  } = useGetInfinitePosts();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showPullIndicator, setShowPullIndicator] = useState(false);
  const ref = useRef<FlatList<Post> | null>(null);
  useScrollToTop(ref);

  const scrollY = useSharedValue(0);
  const isReadyToRefresh = useSharedValue(false);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }, [refetch]);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    scrollY.value = offsetY;

    if (offsetY < -REFRESH_THRESHOLD && !isRefreshing) {
      isReadyToRefresh.value = true;
      setShowPullIndicator(true);
    } else if (offsetY >= 0) {
      setShowPullIndicator(false);
    }
  }, [isRefreshing, scrollY, isReadyToRefresh]);

  const handleScrollEndDrag = useCallback(() => {
    if (isReadyToRefresh.value && !isRefreshing) {
      isReadyToRefresh.value = false;
      handleRefresh();
    }
  }, [isReadyToRefresh, isRefreshing, handleRefresh]);

  const pullIndicatorStyle = useAnimatedStyle(() => {
    const pullProgress = interpolate(
      scrollY.value,
      [-REFRESH_THRESHOLD, 0],
      [1, 0],
      Extrapolation.CLAMP
    );
    return {
      opacity: pullProgress,
      transform: [{ scale: pullProgress }],
    };
  });

  // Show loading indicator
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={darkTheme.accent.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Pull to refresh indicator */}
      {(showPullIndicator || isRefreshing) && (
        <Animated.View
          style={[styles.refreshIndicator, pullIndicatorStyle]}
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
        >
          <ActivityIndicator size="small" color="#FFFFFF" />
        </Animated.View>
      )}

      <FlatList
        ref={ref}
        style={styles.list}
        data={posts?.pages.flat()}
        renderItem={({ item, index }) => {
          // 처음 5개 항목에만 stagger 애니메이션 적용 (성능 최적화)
          if (index < ANIMATION_ITEM_LIMIT) {
            return (
              <Animated.View
                entering={FadeInUp.delay(index * 50)
                  .duration(300)
                  .springify()
                  .damping(15)}
              >
                <FeedItem post={item} />
              </Animated.View>
            );
          }
          return <FeedItem post={item} />;
        }}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(item) => String(item.id)}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        onScroll={handleScroll}
        onScrollEndDrag={handleScrollEndDrag}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        // 성능 최적화 props
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={10}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={styles.footerLoading}>
              <ActivityIndicator size="small" color={darkTheme.accent.primary} />
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.bg.primary,
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: spacing.md,
    paddingBottom: 48,
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkTheme.bg.primary,
  },
  footerLoading: {
    paddingVertical: spacing.xl,
  },
  refreshIndicator: {
    position: 'absolute',
    top: spacing.xl,
    left: 0,
    right: 0,
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FeedList;
