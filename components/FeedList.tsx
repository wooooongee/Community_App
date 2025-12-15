import { colors } from "@/constants";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import FeedItem from "./FeedItem";

const dummyData = [
  {
    id: 1,
    userId: 1,
    title: "더미 제목입니다",
    description:
      "더미 내용입니다 더미 내용입니다더미 내용입니다 더미 내용입니다더미 내용입니다더미 내용입니다더미 내용입니다더미 내용입니다더미 내용입니다더미 내용입니다더미 내용입니다",
    createdAt: "2025-01-01",
    author: {
      id: 1,
      nickname: "닉네임",
      imageUri: "",
    },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
  {
    id: 2,
    userId: 1,
    title: "더미 제목입니다",
    description:
      "더미 내용입니다 더미 내용입니다더미 내용입니다 더미 내용입니다더미 내용입니다더미 내용입니다더미 내용입니다더미 내용입니다더미 내용입니다더미 내용입니다더미 내용입니다",
    createdAt: "2025-01-02",
    author: {
      id: 1,
      nickname: "닉네임",
      imageUri: "",
    },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
];

function FeedList() {
  return (
    <FlatList
      data={dummyData}
      renderItem={({ item }) => <FeedItem post={item} />}
      contentContainerStyle={styles.contentContainer}
      // keyExtractor 는 기존 리액트에서 id 값이 다른요소 구분하기위해 key값 부여하는거랑 같음
      keyExtractor={(item) => String(item.id)}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
});

export default FeedList;
