import { apiService } from './api.service';
import { tokenStorage } from './token.service';
import { User } from '@/types/user';

class UserApi {
  async getCurrentUser(): Promise<User> {
    const accessToken = tokenStorage.getAccessToken();

    if (!accessToken) {
      throw new Error('No access token');
    }

    return apiService.get<User>('/users/current', accessToken);
  }

  async getUserById(userId: string): Promise<User> {
    const accessToken = tokenStorage.getAccessToken();

    if (!accessToken) {
      throw new Error('No access token');
    }

    return apiService.get<User>(`/users/${userId}`, accessToken);
  }

  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{ users: User[]; total: number; page: number; limit: number }> {
    const accessToken = tokenStorage.getAccessToken();

    if (!accessToken) {
      throw new Error('No access token');
    }

    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);

    const endpoint = `/users${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    return apiService.get(endpoint, accessToken);
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const accessToken = tokenStorage.getAccessToken();

    if (!accessToken) {
      throw new Error('No access token');
    }

    return apiService.patch<User>('/users/current', data, accessToken);
  }
}

export const userApi = new UserApi();
