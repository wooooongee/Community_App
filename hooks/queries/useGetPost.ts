import { getPost } from "@/api/post";
import { queryKeys } from "@/constants";
import { useQuery } from "@tanstack/react-query";

function useGetPost(id: number) {
  return useQuery({
    queryFn: () => getPost(Number(id)),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    enabled: Boolean(id),
    // 상세 페이지 진입 시 항상 최신 댓글/투표 데이터 가져오기
    // 캐시된 데이터 먼저 표시 후 백그라운드에서 최신 데이터로 갱신
    staleTime: 0,
  });
}
 
export default useGetPost;
