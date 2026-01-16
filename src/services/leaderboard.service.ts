import { API_CONFIG } from '@/config/constants';
import { LeaderboardResponse, LeaderboardPeriod } from '@/types/leaderboard';
import { apiService } from './api.service';

class LeaderboardApi {
  async getLeaderboard(
    period: LeaderboardPeriod,
    accessToken: string
  ): Promise<LeaderboardResponse> {
    const endpoint = `${API_CONFIG.ENDPOINTS.LEADERBOARD.GET}?period=${period}`;
    return apiService.get<LeaderboardResponse>(endpoint, accessToken);
  }
}

export const leaderboardApi = new LeaderboardApi();
