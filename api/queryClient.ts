import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 20 * 1000, //최신상태가 아님  (stale)
    },
    mutations: {
      retry: false,
    },
  },
});

export default queryClient;
