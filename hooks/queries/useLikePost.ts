import { likePost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import type { Post, Profile } from "@/types";
import { useMutation, InfiniteData } from "@tanstack/react-query";

function useLikePost() {
  return useMutation({
    mutationFn: likePost,
    onMutate: async (postId) => {
      // Cancel both queries
      await queryClient.cancelQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
      });
      await queryClient.cancelQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });

      const user = queryClient.getQueryData<Profile>([
        queryKeys.AUTH,
        queryKeys.GET_ME,
      ]);
      const userId = Number(user?.id);

      // Update detail page query
      const previousPost = queryClient.getQueryData<Post>([
        queryKeys.POST,
        queryKeys.GET_POST,
        postId,
      ]);

      if (previousPost) {
        const newPost = { ...previousPost, likes: [...previousPost.likes] };
        const likedIndex = newPost.likes.findIndex(
          (like) => like.userId === userId
        );

        if (likedIndex >= 0) {
          newPost.likes.splice(likedIndex, 1);
        } else {
          newPost.likes.push({ userId });
        }

        queryClient.setQueryData(
          [queryKeys.POST, queryKeys.GET_POST, postId],
          newPost
        );
      }

      // Update infinite feed list query
      const previousPosts = queryClient.getQueryData<InfiniteData<Post[]>>([
        queryKeys.POST,
        queryKeys.GET_POSTS,
      ]);

      if (previousPosts) {
        const newPages = previousPosts.pages.map((page) =>
          page.map((post) => {
            if (post.id === postId) {
              const newLikes = [...post.likes];
              const likedIndex = newLikes.findIndex(
                (like) => like.userId === userId
              );

              if (likedIndex >= 0) {
                newLikes.splice(likedIndex, 1);
              } else {
                newLikes.push({ userId });
              }

              return { ...post, likes: newLikes };
            }
            return post;
          })
        );

        queryClient.setQueryData([queryKeys.POST, queryKeys.GET_POSTS], {
          ...previousPosts,
          pages: newPages,
        });
      }

      return { previousPost, previousPosts };
    },
    onError: (_err, postId, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(
          [queryKeys.POST, queryKeys.GET_POST, postId],
          context.previousPost
        );
      }
      if (context?.previousPosts) {
        queryClient.setQueryData(
          [queryKeys.POST, queryKeys.GET_POSTS],
          context.previousPosts
        );
      }
    },
  });
}

export default useLikePost;