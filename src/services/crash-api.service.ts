import type {
  CrashBetRequest,
  CrashBetResponse,
  CrashCashoutRequest,
  CrashCashoutResponse,
  CrashCurrentGameResponse,
  CrashGameHistoryResponse,
  CrashBetHistoryResponse,
  HistoryQueryParams,
} from '@/types/crashTypes';
import { apiService } from './api.service';

class CrashApiService {
  private readonly basePath = '/crash';

  async placeBet(
    data: CrashBetRequest,
    accessToken?: string
  ): Promise<CrashBetResponse> {
    return apiService.post<CrashBetResponse>(
      `${this.basePath}/bet`,
      data,
      accessToken
    );
  }

  async cashout(
    data: CrashCashoutRequest,
    accessToken?: string
  ): Promise<CrashCashoutResponse> {
    return apiService.post<CrashCashoutResponse>(
      `${this.basePath}/cashout`,
      data,
      accessToken
    );
  }

  async getCurrentGame(
    accessToken?: string
  ): Promise<CrashCurrentGameResponse> {
    return apiService.get<CrashCurrentGameResponse>(
      `${this.basePath}/current`,
      accessToken
    );
  }

  async getGameHistory(
    params?: HistoryQueryParams,
    accessToken?: string
  ): Promise<CrashGameHistoryResponse> {
    const queryParams = new URLSearchParams({
      limit: String(params?.limit || 10),
      offset: String(params?.offset || 0),
    });

    return apiService.get<CrashGameHistoryResponse>(
      `${this.basePath}/history?${queryParams}`,
      accessToken
    );
  }

  async getBetHistory(
    params?: HistoryQueryParams,
    accessToken?: string
  ): Promise<CrashBetHistoryResponse> {
    const queryParams = new URLSearchParams({
      limit: String(params?.limit || 10),
      offset: String(params?.offset || 0),
    });

    try {
      return await apiService.get<CrashBetHistoryResponse>(
        `${this.basePath}/bets/history?${queryParams}`,
        accessToken
      );
    } catch (error: unknown) {
      if (error instanceof Error && error.message?.includes('404')) {
        return { bets: [] };
      }
      throw error;
    }
  }
}

export const crashApiService = new CrashApiService();
export default CrashApiService;
