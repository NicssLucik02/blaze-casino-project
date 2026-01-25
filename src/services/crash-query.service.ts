import type { QueryClient } from '@tanstack/react-query';
import { crashApiService } from './crash-api.service';
import {
  CrashCurrentGameResponse,
  HistoryQueryParams,
} from '@/types/crashTypes';

export class CrashQueryKeys {
  static readonly base = ['crash'] as const;
  static readonly currentGame = () => [...this.base, 'current'] as const;
  static readonly gameHistory = (params?: HistoryQueryParams) =>
    [...this.base, 'game-history', params] as const;
  static readonly betHistory = (params?: HistoryQueryParams) =>
    [...this.base, 'bet-history', params] as const;
}

class CrashQueryService {
  async prefetchCurrentGame(queryClient: QueryClient) {
    await queryClient.prefetchQuery({
      queryKey: CrashQueryKeys.currentGame(),
      queryFn: () => crashApiService.getCurrentGame(),
    });
  }

  invalidateCurrentGame(queryClient: QueryClient) {
    return queryClient.invalidateQueries({
      queryKey: CrashQueryKeys.currentGame(),
    });
  }

  setCurrentGameData(queryClient: QueryClient, data: CrashCurrentGameResponse) {
    queryClient.setQueryData(CrashQueryKeys.currentGame(), data);
  }

  getCurrentGameData(
    queryClient: QueryClient
  ): CrashCurrentGameResponse | undefined {
    return queryClient.getQueryData(CrashQueryKeys.currentGame());
  }

  updateCurrentGameData(
    queryClient: QueryClient,
    updater: (
      old: CrashCurrentGameResponse | undefined
    ) => CrashCurrentGameResponse
  ) {
    queryClient.setQueryData(CrashQueryKeys.currentGame(), updater);
  }
}

export const crashQueryService = new CrashQueryService();

export default CrashQueryService;
