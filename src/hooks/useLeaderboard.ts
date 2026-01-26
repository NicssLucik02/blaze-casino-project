'use client';

import { useQuery } from '@tanstack/react-query';
import { leaderboardApi } from '@/services/leaderboard.service';
import { tokenStorage } from '@/services/token.service';
import { QUERY_KEYS } from '@/config/constants';
import { LeaderboardPeriod } from '@/types/leaderboard';

export const useLeaderboard = (period: LeaderboardPeriod) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.LEADERBOARD, period],
    queryFn: async () => {
      const token = tokenStorage.getAccessToken();
      if (!token) {
        throw new Error('No access token');
      }
      return leaderboardApi.getLeaderboard(period, token);
    },
    enabled: typeof window !== 'undefined',
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    retry: 1,
  });
};
