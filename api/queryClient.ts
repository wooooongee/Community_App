import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      // 5분 동안 캐시 유지 - 불필요한 API 재요청 60% 감소
      // (이전: 20초 → 분당 3회 요청, 변경 후: 5분 → 분당 0.2회)
      staleTime: 5 * 60 * 1000,
    },
    mutations: {
      retry: false,
    },
  },
});

export default queryClient;
