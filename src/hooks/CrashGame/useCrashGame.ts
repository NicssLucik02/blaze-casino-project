import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  CrashGameStatus,
  type CrashBetRequest,
  type CrashCashoutRequest,
  type CrashCurrentGameResponse,
  type HistoryQueryParams,
} from '@/types/crashTypes';
import { CrashQueryKeys } from '@/services/crash-query.service';
import { tokenStorage } from '@/services/token.service';
import { crashApiService } from '@/services/crash-api.service';
import { QUERY_KEYS } from '@/config/constants';

export function useCrash(options?: {
  refetchInterval?: number;
  enabled?: boolean;
}) {
  const queryClient = useQueryClient();

  const gameQuery = useQuery<CrashCurrentGameResponse>({
    queryKey: CrashQueryKeys.currentGame(),
    queryFn: () => {
      const token = tokenStorage.getAccessToken();
      return crashApiService.getCurrentGame(token);
    },
    refetchInterval: options?.refetchInterval,
    enabled: options?.enabled,
    staleTime: 0,
  });

  const placeBetMutation = useMutation({
    mutationFn: (data: CrashBetRequest) => {
      const token = tokenStorage.getAccessToken();
      return crashApiService.placeBet(data, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CrashQueryKeys.currentGame(),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.USER,
      });
    },
  });

  const cashoutMutation = useMutation({
    mutationFn: (data: CrashCashoutRequest) => {
      const token = tokenStorage.getAccessToken();
      return crashApiService.cashout(data, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CrashQueryKeys.currentGame(),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.USER,
      });
    },
  });

  const canPlaceBet =
    !placeBetMutation.isPending &&
    gameQuery.data?.state === CrashGameStatus.WAITING;
  const canCashout =
    !cashoutMutation.isPending &&
    gameQuery.data?.state === CrashGameStatus.RUNNING &&
    !!gameQuery.data?.myBet;
  const hasActiveBet = !!gameQuery.data?.myBet;

  return {
    game: gameQuery.data,
    isLoading: gameQuery.isLoading,
    isError: gameQuery.isError,
    error: gameQuery.error,
    refetch: gameQuery.refetch,

    placeBet: placeBetMutation.mutate,
    isPlacingBet: placeBetMutation.isPending,
    placeBetError: placeBetMutation.error,
    placeBetReset: placeBetMutation.reset,

    cashout: cashoutMutation.mutate,
    isCashingOut: cashoutMutation.isPending,
    cashoutError: cashoutMutation.error,
    cashoutReset: cashoutMutation.reset,

    canPlaceBet,
    canCashout,
    hasActiveBet,
  };
}

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

export const useCrashGame = useCrash;
