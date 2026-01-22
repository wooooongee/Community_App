import { createVote } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import type { CreateVoteDto, Post, Profile } from "@/types";
import { useMutation } from "@tanstack/react-query";

function useCreateVote() {
  return useMutation({
    mutationFn: createVote,
    onMutate: async (voteData: CreateVoteDto) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, voteData.postId],
      });

      const user = queryClient.getQueryData<Profile>([
        queryKeys.AUTH,
        queryKeys.GET_ME,
      ]);
      const userId = Number(user?.id);

      const previousPost = queryClient.getQueryData<Post>([
        queryKeys.POST,
        queryKeys.GET_POST,
        voteData.postId,
      ]);

      if (previousPost && previousPost.votes) {
        const newPost = {
          ...previousPost,
          votes: previousPost.votes.map((vote) => ({
            ...vote,
            options: vote.options.map((option) => {
              const filteredVotes = option.userVotes.filter(
                (v) => v.userId !== userId
              );

              if (option.id === voteData.voteOptionId) {
                return {
                  ...option,
                  userVotes: [...filteredVotes, { userId }],
                };
              }

              return { ...option, userVotes: filteredVotes };
            }),
          })),
          voteCount:
            previousPost.votes.some((vote) =>
              vote.options.some((opt) =>
                opt.userVotes.some((v) => v.userId === userId)
              )
            )
              ? previousPost.voteCount
              : previousPost.voteCount + 1,
        };

        queryClient.setQueryData(
          [queryKeys.POST, queryKeys.GET_POST, voteData.postId],
          newPost
        );
      }

      return { previousPost };
    },
    onError: (_err, voteData, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(
          [queryKeys.POST, queryKeys.GET_POST, voteData.postId],
          context.previousPost
        );
      }
    },
    onSuccess: (_data, voteData) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, voteData.postId],
      });
    },
  });
}

export default useCreateVote;
