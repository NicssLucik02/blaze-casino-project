'use client';

import { useQuery } from '@tanstack/react-query';
import { leaderboardApi } from '@/services/leaderboard.service';
import { tokenStorage } from '@/services/token.service';
import { QUERY_KEYS } from '@/config/constants';
import { LeaderboardPeriod } from '@/types/leaderboard';

export const useLeaderboard = (period: LeaderboardPeriod) => {
  const token = tokenStorage.getAccessToken();
  const isEnabled = !!token;

  return useQuery({
    queryKey: [...QUERY_KEYS.LEADERBOARD, period],
    queryFn: async () => {
      const token = tokenStorage.getAccessToken();
      if (!token) {
        throw new Error('No access token');
      }
      const result = await leaderboardApi.getLeaderboard(period, token);
      return result;
    },
    enabled: isEnabled,
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    retry: 1,
  });
};
