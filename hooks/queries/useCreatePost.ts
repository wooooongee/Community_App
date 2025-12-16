import { createPost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      router.replace("/");
      // 쿼리 무효화하고 상태 최신화
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST],
      });
    },
  });
}

export { useCreatePost };
