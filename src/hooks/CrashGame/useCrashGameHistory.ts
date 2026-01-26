import { crashApiService } from '@/services/crash-api.service';
import { CrashQueryKeys } from '@/services/crash-query.service';
import { tokenStorage } from '@/services/token.service';
import { HistoryQueryParams } from '@/types/crashTypes';
import { useQuery } from '@tanstack/react-query';

export function useBetHistory(params?: HistoryQueryParams) {
  return useQuery({
    queryKey: CrashQueryKeys.betHistory(params),
    queryFn: () => {
      const token = tokenStorage.getAccessToken();
      return crashApiService.getBetHistory(params, token);
    },
    staleTime: 30000,
  });
}

export function useGameHistory(params?: HistoryQueryParams) {
  return useQuery({
    queryKey: CrashQueryKeys.gameHistory(params),
    queryFn: () => {
      const token = tokenStorage.getAccessToken();
      return crashApiService.getGameHistory(params, token);
    },
    staleTime: 30000,
  });
}
