import { colors } from "@/constants";
import useGetInfiniteSearchPosts from "@/hooks/queries/useGetInfiniteSearchPosts";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Platform, StatusBar, StyleSheet, View } from "react-native";
import FeedItem from "./FeedItem";
import SearchInput from "./SearchInput";

function SearchFeedList() {
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
            size={28}
            color={colors.BLACK}
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
        renderItem={({ item }) => <FeedItem post={item} />}
        contentContainerStyle={styles.contentContainer}
        // keyExtractor 는 기존 리액트에서 id 값이 다른요소 구분하기위해 key값 부여하는거랑 같음
        keyExtractor={(item) => String(item.id)}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
  inputContainer: {
    marginBottom: 8,
    paddingHorizontal: 16,
    gap: 8,
    backgroundColor: colors.WHITE,
    height: 44,
    flexDirection: "row",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  arrowLeft: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SearchFeedList;
