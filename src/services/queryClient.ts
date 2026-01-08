'use client';
import { QueryClient } from '@tanstack/react-query';
import { QUERY_CONFIG } from '@/config/constants';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CONFIG.STALE_TIME,
      retry: QUERY_CONFIG.RETRY_COUNT,
      refetchOnWindowFocus: QUERY_CONFIG.REFETCH_ON_WINDOW_FOCUS,
    },
    mutations: {
      retry: QUERY_CONFIG.MUTATION_RETRY,
    },
  },
});
